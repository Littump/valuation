from rest_framework import permissions, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from api.models import Property
from api.serializers import (
    PhotoUploadSerializer,
    PriceSerializer,
    PropertySerializer,
)
from ml.utils import calculate_price, get_repair


class PropertyViewSet(viewsets.ModelViewSet):
    queryset = Property.objects.all()
    serializer_class = PropertySerializer
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=False, methods=['POST'],
            permission_classes=[permissions.AllowAny])
    def get_price(self, request):
        serializer = PriceSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        interior_style = float(
            serializer.validated_data['repair'].split(';')[0]
        )
        interior_qual = float(
            serializer.validated_data['repair'].split(';')[1]
        )
        serializer.validated_data['repair'] = [interior_style, interior_qual]
        price = calculate_price(serializer.validated_data)
        return Response({'price': price})

    @action(detail=False, methods=['POST'],
            permission_classes=[permissions.AllowAny])
    def calculate_repair(self, request):
        serializer = PhotoUploadSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        photos = serializer.validated_data['photos']
        repair = get_repair(photos)
        data = {
            'interior_style': repair['interior_style'],
            'interior_qual': repair['interior_qual']
        }
        return Response(data)

    def list(self, request):
        queryset = self.get_queryset()
        serialized_properties = []
        for property in queryset:
            interior_style = float(property.repair.split(';')[0])
            interior_qual = float(property.repair.split(';')[1])
            property_data = {
                "address": property.address,
                "house_material": property.house_material,
                "object_type": property.object_type,
                "cnt_rooms": property.cnt_rooms,
                "floor": property.floor,
                "area": property.area,
                "repair": [interior_style, interior_qual],
                "text": property.text,
                "has_lift": property.has_lift,
                "parking_type": property.parking_type,
                "price": property.price
            }

            if property_data:
                property_data["real_price"] = calculate_price(property_data)
                serialized_properties.append(property_data)

        return Response(serialized_properties)

    def get_queryset(self):
        user = self.request.user
        queryset = Property.objects.all()
        params = self.request.query_params

        for field, value in params.items():
            if field in [f.name for f in Property._meta.get_fields()]:
                if field in [
                    'price',
                    'cnt_rooms',
                    'floor',
                    'area',
                    'floors',
                    'house_year',
                    'metro_min'
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
                    'metro_name'
                ]:
                    queryset = queryset.filter(**{f'{field}__iexact': value})
                elif field == 'author':
                    queryset = queryset.filter(author=user)
                elif field == 'address':
                    queryset = queryset.filter(address__contains=value)

        return queryset
