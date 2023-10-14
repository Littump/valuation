from rest_framework import permissions, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Property
from .serializers import PhotoUploadSerializer, PriceSerializer


class PropertyViewSet(viewsets.ModelViewSet):
    queryset = Property.objects.all()
    serializer_class = PriceSerializer
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=False, methods=['GET'],
            permission_classes=[permissions.AllowAny])
    def get_price(self, request):
        serializer = PriceSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        # price = calculate_price(data)
        price = len(serializer.validated_data) * 10
        return Response({'price': price})

    @action(detail=False, methods=['GET'])
    def calculate_repair(self, request):
        serializer = PhotoUploadSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        photos = serializer.validated_data['photos']
        # repair = get_repair(photos)
        repair = str(len(photos))
        return Response({'repair': repair})

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
