from rest_framework import serializers
from .models import *
from mockups.serializers import *
from products.serializers import *



class DesignsSerializer(serializers.ModelSerializer):
    mockups = MockupSerializer(many=True, read_only=True)
    mockup_libraries = MockupLibrarySerializer(many=True, read_only=True)
    products = ProductsSerializer(many=True, read_only=True)

    class Meta:
        model = Design
        fields = '__all__'
        read_only_fields = ['created_on']

# class DesignsCreateUpdateSerializer(serializers.ModelSerializer):
#     # Allow updating mockups and mockup_libraries by primary key IDs
#     mockups = serializers.PrimaryKeyRelatedField(queryset=Mockup.objects.all(), many=True, required=False)
#     mockup_libraries = serializers.PrimaryKeyRelatedField(queryset=MockupLibrary.objects.all(), many=True, required=False)

#     class Meta:
#         model = Design
#         fields = '__all__'

#     def update(self, instance, validated_data):
#         # Pop mockups and mockup_libraries from validated data if included in the update request
#         mockups_data = validated_data.pop('mockups', None)
#         mockup_libraries_data = validated_data.pop('mockup_libraries', None)

#         # Update other fields
#         for attr, value in validated_data.items():
#             setattr(instance, attr, value)
#         instance.save()

#         # Add new mockups if provided
#         if mockups_data is not None:
#             instance.mockups.add(*mockups_data)  # Add new mockups to the existing ones

#         # Add new mockup libraries if provided
#         if mockup_libraries_data is not None:
#             instance.mockup_libraries.add(*mockup_libraries_data)  # Add new mockup libraries to the existing ones

#         return instance