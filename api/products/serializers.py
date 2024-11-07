from rest_framework import serializers
from .models import *
from mockups.serializers import *


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['id', 'product', 'mockup', 'image_path', 'created_on']
        read_only_fields = ['product', 'mockup', 'created_on']

class ProductLibraryImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = LibraryProductImage
        fields = "__all__"

class ProductsSerializer(serializers.ModelSerializer):
    product_images = ProductImageSerializer(many=True, read_only=True)
    library_product_images = ProductLibraryImageSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        #fields = ['id', 'title', 'description', 'status', 'created_on', 'designs', 'mockups', 'mockup_libraries', 'product_images', 'library_product_images']
        fields = "__all__"

class ProductsCreateUpdateSerializer(serializers.ModelSerializer):
    # Allow updating mockups and mockup_libraries by primary key IDs
    mockups = serializers.PrimaryKeyRelatedField(queryset=Mockup.objects.all(), many=True, required=False)
    mockup_libraries = serializers.PrimaryKeyRelatedField(queryset=MockupLibrary.objects.all(), many=True, required=False)
    product_images = ProductImageSerializer(many=True, read_only=True)
    library_product_images = ProductLibraryImageSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = '__all__'

    def update(self, instance, validated_data):
        # Pop mockups and mockup_libraries from validated data if included in the update request
        mockups_data = validated_data.pop('mockups', None)
        mockup_libraries_data = validated_data.pop('mockup_libraries', None)

        # Update other fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        # Add new mockups if provided
        if mockups_data is not None:
            instance.mockups.add(*mockups_data)  # Add new mockups to the existing ones

        # Add new mockup libraries if provided
        if mockup_libraries_data is not None:
            instance.mockup_libraries.add(*mockup_libraries_data)  # Add new mockup libraries to the existing ones

        return instance
    
class ProductCategorySerializer(serializers.ModelSerializer):
    products = ProductsSerializer(source="product_category", many=True, read_only=True)
    class Meta:
        model = ProductCategory
        fields = '__all__'


class ProductMockupUpdateSerializer(serializers.ModelSerializer):
    mockups = serializers.PrimaryKeyRelatedField(
        queryset=Mockup.objects.all(), many=True
    )

    class Meta:
        model = Product
        fields = ['mockups']