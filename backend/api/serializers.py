from rest_framework import serializers

from .models import Property

from .utils import get_model

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


class PropertySerializer(serializers.ModelSerializer):
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
            "parking_type",
            "price"
        )

    def create(self, validated_data):
        model = get_model()
        str_repair = validated_data['repair']
        interior_style = float(validated_data['repair'].split(';')[0])
        interior_qual = float(validated_data['repair'].split(';')[1])
        validated_data['repair'] = [interior_style, interior_qual]
        data = model.get_appart_info(validated_data)
        validated_data['repair'] = str_repair
        validated_data['floors'] = data['floors']
        validated_data['house_year'] = data['house_year']
        validated_data['metro_name'] = data['metro_name']
        validated_data['metro_min'] = data['metro_min']
        validated_data['metro_how'] = data['metro_how']
        author = self.context.get("request").user
        property = Property.objects.create(author=author, **validated_data)
        return property


class PhotoUploadSerializer(serializers.Serializer):
    photos = serializers.ListField(child=serializers.ImageField())
