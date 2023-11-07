import random
from collections import defaultdict

from rest_framework import permissions, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from api.models import Property, User
from api.serializers import (
    PropertySerializer,
    PhotoUploadSerializer,
    PropertyCalculateSerializer,
    PropertySerializerResponse,
)
from ml.utils import (
    calculate_price,
    get_repair,
    get_infrastructure
)
from utils.geocoder.geocoder import get_coordinates
from utils.info_house.get_info_house import ObjectInfo
from utils.similar_objects.objects_helper import ObjectsHelper
from utils.balancer_points.balancer import delete_deviations


def get_user():
    user, created = User.objects.get_or_create(
        username="theUser",
        first_name="John",
        last_name="James",
        email="john@email.com",
        password="12345asdeq",
    )
    return user


class PropertyViewSet(viewsets.ModelViewSet):
    queryset = Property.objects.all()
    serializer_class = PropertySerializer
    permission_classes = [permissions.IsAuthenticated]
    object_info = ObjectInfo()
    objects_helper = ObjectsHelper()

    @action(detail=False, methods=['POST'],
            permission_classes=[permissions.AllowAny])
    def get_price(self, request):
        serializer = PropertyCalculateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        interior_style, interior_qual = (
            float(serializer.validated_data['repair'].split(';')[0]),
            float(serializer.validated_data['repair'].split(';')[1]),
        )
        serializer.validated_data['repair'] = [interior_style, interior_qual]
        address = serializer.validated_data['address']
        latitude, longitude, address = get_coordinates(address)
        serializer.validated_data['latitude'] = latitude
        serializer.validated_data['longitude'] = longitude
        serializer.validated_data['address'] = address
        price = calculate_price(serializer.validated_data)
        serializer.validated_data['repair'] = f'{interior_style};{interior_qual}'
        house_info = self.object_info.get_info_house(address)
        infrastructure = get_infrastructure(address, latitude, longitude)
        similar_objects = self.objects_helper.get_flat_neighbors(serializer.validated_data)
        return Response({
            'price': price,
            'latitude': latitude,
            'longitude': longitude,
            'house_info': house_info,
            'infrastructure': infrastructure,
            'similar_objects': similar_objects,
        })

    @action(detail=False, methods=['POST'],
            permission_classes=[permissions.AllowAny])
    def calculate_repair(self, request):
        serializer = PhotoUploadSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        photos = serializer.validated_data['photos']
        repair = get_repair(photos)
        data = (f'{int(round(repair["interior_style"]))};'
                f'{int(round(repair["interior_qual"]))}')
        return Response({'repair': data})

    def list(self, request):
        params = self.request.query_params
        queryset = self.get_queryset()

        if 'analytics' not in params:
            serialized_properties = []
            for propert in queryset:
                serialized_property = PropertySerializerResponse(propert).data

                repair = propert.repair
                interior_style = float(propert.repair.split(';')[0])
                interior_qual = float(propert.repair.split(';')[1])
                serialized_property["repair"] = [interior_style, interior_qual]

                if 'author' in params:
                    serialized_property["price"] = propert.price_buy
                    serialized_property["real_price"] = calculate_price(serialized_property)
                else:
                    serialized_property["price"] = propert.price_sell

                serialized_property['repair'] = repair
                serialized_properties.append(serialized_property)
            return Response(serialized_properties)

        if params['type_analytics'] == 'column':
            field = params['field']
            result = defaultdict(int)
            for propert in queryset:
                value = getattr(propert, field)
                if value:
                    result[value] += 1
            if field in ['parking_type', 'house_material']:
                del result['0']
            return Response(result)
        if params['type_analytics'] == 'cloud':
            field_1 = params['field1']
            if field_1 == 'price':
                if 'author' in params:
                    field_1 = 'price_buy'
                else:
                    field_1 = 'price_sell'
            field_2 = params['field2']
            if field_2 == 'price':
                if 'author' in params:
                    field_2 = 'price_buy'
                else:
                    field_2 = 'price_sell'
            cnt = 0
            result = []
            queryset_list = list(queryset)
            random.shuffle(queryset_list)
            for propert in queryset_list:
                value_1 = getattr(propert, field_1)
                value_2 = getattr(propert, field_2)
                if value_1 and value_2:
                    result.append([value_1, value_2])
                    cnt += 1
                if cnt == 200:
                    break
            result = delete_deviations(result)
            return Response({"result": result})

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serialized_property = PropertySerializerResponse(instance).data

        repair = instance.repair
        interior_style = float(instance.repair.split(';')[0])
        interior_qual = float(instance.repair.split(';')[1])
        serialized_property["repair"] = [interior_style, interior_qual]

        if 'author' in request.query_params:
            serialized_property["price"] = instance.price_buy
        else:
            serialized_property["price"] = instance.price_sell

        serialized_property["real_price"] = calculate_price(serialized_property)
        serialized_property['repair'] = repair

        return Response(serialized_property)

    def get_queryset(self):
        if self.request.method != 'GET' or self.action == 'retrieve':
            return self.queryset
        user = self.request.user
        params = self.request.query_params
        if 'author' in params:
            queryset = self.queryset.filter(author=user)
        else:
            queryset = self.queryset.filter(author=get_user())
        for field, value in params.items():
            if field == 'author':
                queryset = queryset.filter(author=user)
            elif field == 'price':
                min_value, max_value = map(int, value.split(','))
                if 'author' in params.keys():
                    field_price = 'price_buy'
                else:
                    field_price = 'price_sell'
                queryset = queryset.filter(
                    **{
                        f'{field_price}__gte': min_value,
                        f'{field_price}__lte': max_value,
                    }
                )
            elif field in [
                'cnt_rooms',
                'floor',
                'area',
                'floors',
                'house_year',
                'metro_min',
            ]:
                min_value, max_value = map(int, value.split(','))
                queryset = queryset.filter(
                    **{
                        f'{field}__gte': min_value,
                        f'{field}__lte': max_value
                    }
                )
            elif field in [
                'house_material',
                'object_type',
                'repair',
                'metro_name',
                'region',
            ]:
                queryset = queryset.filter(**{f'{field}__iexact': value})
        return queryset
