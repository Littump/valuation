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
        
    def create(self, validated_data):
        validated_data['price'] = 5
        validated_data['floors'] = 6
        validated_data['house_year'] = 6
        validated_data['metro_name'] = '6'
        validated_data['metro_min'] = 6
        validated_data['metro_how'] = '6'
        author = self.context.get("request").user
        property = Property.objects.create(author=author, **validated_data)
        return property


class PhotoUploadSerializer(serializers.Serializer):
    photos = serializers.ListField(child=serializers.ImageField())
