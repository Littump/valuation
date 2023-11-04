from rest_framework import permissions, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from api.models import Property
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


def get_info_house(address):
    return {
        "year": 1984,
        "count_entrances": 2,
        "gas": "Центральное",
        "hot_water": "Полное снабжение",
    }


class PropertyViewSet(viewsets.ModelViewSet):
    queryset = Property.objects.all()
    serializer_class = PropertySerializer
    permission_classes = [permissions.IsAuthenticated]

    @staticmethod
    def get_similar_objects(data):
        return []

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
        price = calculate_price(serializer.validated_data)

        address = serializer.validated_data['address']
        house_info = get_info_house(address)
        infrastructure = get_infrastructure(address)
        similar_objects = self.get_similar_objects(serializer.validated_data)
        return Response({
            'price': price,
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
        user = self.request.user
        params = self.request.query_params
        queryset = Property.objects.filter(author=user)
        serialized_properties = []
        for property in queryset:
            serialized_property = PropertySerializerResponse(property).data

            repair = property.repair
            interior_style = float(property.repair.split(';')[0])
            interior_qual = float(property.repair.split(';')[1])
            serialized_property["repair"] = [interior_style, interior_qual]

            if 'author' in params:
                serialized_property["price"] = property.price_buy
            else:
                serialized_property["price"] = property.price_sell

            serialized_property["real_price"] = calculate_price(serialized_property)
            serialized_property['repair'] = repair
            serialized_properties.append(serialized_property)

        return Response(serialized_properties)

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
        user = self.request.user
        queryset = Property.objects.all()
        params = self.request.query_params

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
