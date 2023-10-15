from rest_framework import serializers

from .models import Property

# class PropertySerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Property
#         fields = '__all__'


class PriceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Property
        fields = (
            "address",
            "house_material",
            "object_type",
            "cnt_rooms",
            "floor",
            "area",
            "repair",
            "text",
            "has_lift",
            "parking_type"
        )


class PhotoUploadSerializer(serializers.Serializer):
    photos = serializers.ListField(child=serializers.ImageField())
