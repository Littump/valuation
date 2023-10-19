from rest_framework import permissions, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Property
from .serializers import PhotoUploadSerializer, PriceSerializer
from .utils import calculate_price, get_repair


class PropertyViewSet(viewsets.ModelViewSet):
    queryset = Property.objects.all()
    serializer_class = PriceSerializer
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=False, methods=['POST'],
            permission_classes=[permissions.AllowAny])
    def get_price(self, request):
        serializer = PriceSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        interior_style = float(serializer.validated_data['repair'].split(';')[0])
        interior_qual = float(serializer.validated_data['repair'].split(';')[1])
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

    def get_queryset(self):
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
                    'address',
                    'house_material',
                    'text',
                    'object_type',
                    'repair',
                    'region',
                    'metro_name',
                    'metro_how'
                ]:
                    queryset = queryset.filter(**{f'{field}__iexact': value})

        return queryset
