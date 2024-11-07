from rest_framework import serializers
from .models import *

class ProductCategorySerializer(serializers.ModelSerializer):
    mockups = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    class Meta:
        model = MockupCategory
        fields = "__all__"

class TagSerializer(serializers.ModelSerializer):
    #mockups = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    class Meta:
        model = Tag
        fields = '__all__'

class ColorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Color
        fields = "__all__"

class MockupSerializer(serializers.ModelSerializer):
    #tags = serializers.PrimaryKeyRelatedField(many=True, queryset=Tag.objects.all(), required=False)
    tags = TagSerializer(many=True, required=False)
    color = serializers.PrimaryKeyRelatedField(queryset=Color.objects.all(), allow_null=True)  # Add color as a primary key field


    class Meta:
        model = Mockup
        fields = '__all__'
        read_only_fields = ['created_on']

    def to_representation(self, instance):
        """Customize the output representation by fetching product_category and color details."""
        representation = super().to_representation(instance)
        
        # Fetch full product category details if it exists
        if instance.mockup_category_id:
            category = MockupCategory.objects.filter(id=instance.mockup_category_id).first()
            if category:
                representation['product_category'] = {
                    "id": category.id,
                    "title": category.title
                }
        
        # Fetch full color details if it exists
        if instance.color_id:
            color = Color.objects.filter(id=instance.color_id).first()
            if color:
                representation['color'] = {
                    "id": color.id,
                    "title": color.title,
                    "hex_code": color.hex_code
                }

        return representation

    # def create(self, validated_data):
    #     # Extract the nested product_category data
    #     product_category_data = validated_data.pop('product_category')
    #     # Create or get the product category
    #     product_category, created = ProductCategory.objects.get_or_create(**product_category_data)
    #     # Create the mockup instance with the related product category
    #     mockup = Mockup.objects.create(product_category=product_category, **validated_data)
        
    #     return mockup
    def validate_tags(self, value):
        # Check if the number of tags exceeds 12
        if len(value) > 12:
            raise serializers.ValidationError("You cannot add more than 12 tags to a Mockup.")
        return value

    def create(self, validated_data):
        tags_data = validated_data.pop('tags', [])
        mockup = Mockup.objects.create(**validated_data)

        # Create or get existing tags and associate them with the mockup
        for tag_data in tags_data:
            tag, created = Tag.objects.get_or_create(title=tag_data['title'])
            mockup.tags.add(tag)

        return mockup

    # Handle tags during update
    def update(self, instance, validated_data):
        tags_data = validated_data.pop('tags', [])
        
        # Update Mockup fields
        instance.title = validated_data.get('title', instance.title)
        instance.gender = validated_data.get('gender', instance.gender)
        instance.product_category = validated_data.get('product_category', instance.product_category)
        instance.mockup_image = validated_data.get('mockup_image', instance.mockup_image)
        instance.mockup_box_image = validated_data.get('mockup_box_image', instance.mockup_box_image)
        instance.save()

        # Clear existing tags and re-add tags from request
        instance.tags.clear()
        for tag_data in tags_data:
            tag, created = Tag.objects.get_or_create(title=tag_data['title'])
            instance.tags.add(tag)

        return instance

class MockupLibrarySerializer(serializers.ModelSerializer):
    mockups = MockupSerializer(many=True)

    class Meta:
        model = MockupLibrary
        fields = "__all__"

# class MockupLibraryCreateSerializer(serializers.ModelSerializer):
#     mockups = serializers.PrimaryKeyRelatedField(queryset=Mockup.objects.all(), many=True)

#     class Meta:
#         model = MockupLibrary
#         fields = ['id', 'title', 'mockups']

#     def create(self, validated_data):
#         mockups = validated_data.pop('mockups', None)
#         library = MockupLibrary.objects.create(**validated_data)
#         if mockups:
#             library.mockups.set(mockups)
#         return library

#     def update(self, instance, validated_data):
#         # Update the non-nested fields
#         instance.title = validated_data.get('title', instance.title)
#         instance.save()

#         # Update the nested mockups field
#         new_mockups = validated_data.get('mockups')
#         if new_mockups is not None:
#             # Use `set` to replace existing mockups with the provided ones
#             instance.mockups.add(*new_mockups) 

#         return instance

class MockupLibraryCreateSerializer(serializers.ModelSerializer):
    mockups = serializers.PrimaryKeyRelatedField(queryset=Mockup.objects.all(), many=True)

    class Meta:
        model = MockupLibrary
        fields = ['id', 'title', 'description', 'mockups']

    def create(self, validated_data):
        mockups = validated_data.pop('mockups', None)
        library = MockupLibrary.objects.create(**validated_data)
        if mockups:
            library.mockups.set(mockups)
        return library

    def update(self, instance, validated_data):
        # Update non-nested fields
        instance.title = validated_data.get('title', instance.title)
        instance.save()

        # Separate out the current mockups
        new_mockups = set(validated_data.get('mockups', []))
        current_mockups = set(instance.mockups.all())

        # Determine mockups to add and remove
        mockups_to_add = new_mockups - current_mockups
        mockups_to_remove = current_mockups - new_mockups

        # Add and remove mockups individually
        if mockups_to_add:
            instance.mockups.add(*mockups_to_add)
        if mockups_to_remove:
            instance.mockups.remove(*mockups_to_remove)

        return instance
    
class ColorSerializer(serializers.ModelSerializer):

    class Meta:
        model = Color
        fields = "__all__"
    
