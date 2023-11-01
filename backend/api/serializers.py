from rest_framework import serializers

from api.models import Property
from ml.utils import get_model


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


class PropertySerializer(serializers.ModelSerializer):
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
            "parking_type",
            "price_buy",
        )

    def create(self, validated_data):
        house_info = get_info_house(validated_data['address'])
        validated_data['metro_how'] = 1
        validated_data['region'] = house_info['region']
        validated_data['metro_name'] = house_info['metro_name']
        validated_data['house_year'] = house_info['house_year']
        validated_data['metro_min'] = house_info['metro_min']
        validated_data['author'] = self.context.get("request").user
        property = Property.objects.create(**validated_data)
        return property


class PhotoUploadSerializer(serializers.Serializer):
    photos = serializers.ListField(child=serializers.ImageField())
