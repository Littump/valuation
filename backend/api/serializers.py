from rest_framework import serializers

from api.models import Property
from ml.utils import (
    get_appart_info
)
from utils.geocoder.geocoder import get_coordinates


class PropertyCalculateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Property
        fields = (
            "address",
            "house_material",
            "text",
            "object_type",
            "cnt_rooms",
            "floor",
            "floors",
            "area",
            "repair",
            "has_lift",
            "parking_type"
        )


class PropertySerializerResponse(serializers.ModelSerializer):
    class Meta:
        model = Property
        fields = "__all__"


class PropertySerializer(serializers.ModelSerializer):
    class Meta:
        model = Property
        fields = (
            "id",
            "address",
            "house_material",
            "text",
            "object_type",
            "cnt_rooms",
            "floor",
            "floors",
            "area",
            "repair",
            "has_lift",
            "parking_type",
            "price_buy",
        )

    def create(self, validated_data):
        address = validated_data['address']
        latitude, longitude, address = get_coordinates(address)
        validated_data['latitude'] = latitude
        validated_data['longitude'] = longitude
        validated_data['address'] = address
        house_info = get_appart_info(
            validated_data['address'],
            latitude,
            longitude,
        )
        validated_data['metro_how'] = 1
        validated_data['region'] = house_info.get('region', None)
        validated_data['metro_name'] = house_info['metro_name']
        validated_data['house_year'] = house_info['house_year']
        validated_data['metro_min'] = house_info['metro_min']
        validated_data['author'] = self.context.get("request").user
        propert = Property.objects.create(**validated_data)
        return propert


class PhotoUploadSerializer(serializers.Serializer):
    photos = serializers.ListField(child=serializers.ImageField())
