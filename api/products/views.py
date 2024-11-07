import os
from django.conf import settings
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import *
from .serializers import *

class ProductsViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductsSerializer

    @action(detail=True, methods=['patch'], url_path='add_mockups')
    def add_mockups(self, request, pk=None):
        # Retrieve the product instance
        product = self.get_object()

        # Get the list of mockup IDs to add from the request data
        mockup_ids_to_add = set(request.data.get('mockups', []))
        
        # Get the current mockups related to this product
        current_mockups = set(product.mockups.values_list('id', flat=True))
        
        # Determine which mockups to actually add (new ones only)
        mockups_to_add = mockup_ids_to_add - current_mockups
        
        # Add new mockups
        for mockup_id in mockups_to_add:
            try:
                mockup = Mockup.objects.get(id=mockup_id)
                product.mockups.add(mockup)
                # Optional: Add any additional processing here, like creating new product images
            except Mockup.DoesNotExist:
                return Response({"error": f"Mockup with ID {mockup_id} does not exist."}, status=status.HTTP_400_BAD_REQUEST)

        # Serialize and return the updated product data
        serializer = ProductsSerializer(product)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=True, methods=['patch'], url_path='remove_mockups')
    def remove_mockups(self, request, pk=None):
        # Retrieve the product instance
        product = self.get_object()

        # Get the list of mockup IDs to remove from the request data
        mockup_ids_to_remove = set(request.data.get('mockups', []))
        
        # Remove specified mockups and clean up associated images
        for mockup_id in mockup_ids_to_remove:
            try:
                mockup = Mockup.objects.get(id=mockup_id)
                product.mockups.remove(mockup)
                
                # Find and delete associated ProductImage records and image files
                product_images = ProductImage.objects.filter(product=product, mockup=mockup)
                for product_image in product_images:
                    # Delete the image file from the file system
                    image_path = os.path.join(settings.MEDIA_ROOT, product_image.image_path.name)
                    if os.path.exists(image_path):
                        os.remove(image_path)
                    # Delete the ProductImage record
                    product_image.delete()
                    
            except Mockup.DoesNotExist:
                return Response({"error": f"Mockup with ID {mockup_id} does not exist."}, status=status.HTTP_400_BAD_REQUEST)
        
        # Serialize and return the updated product data
        serializer = ProductsSerializer(product)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=True, methods=['patch'], url_path='add_mockup_library')
    def add_mockup_library(self, request, pk=None):
        # Retrieve the product instance
        product = self.get_object()

        # Get the list of mockup library IDs to add
        library_ids_to_add = set(request.data.get('libraries', []))

        # Add each library to the product
        for library_id in library_ids_to_add:
            try:
                library = MockupLibrary.objects.get(id=library_id)
                product.mockup_libraries.add(library)
                # The signal will handle the image generation process
            except MockupLibrary.DoesNotExist:
                return Response({"error": f"MockupLibrary with ID {library_id} does not exist."}, status=status.HTTP_400_BAD_REQUEST)

        # Serialize and return the updated product data
        serializer = ProductsSerializer(product)
        return Response(serializer.data, status=status.HTTP_200_OK)
    @action(detail=True, methods=['patch'], url_path='remove_mockup_library')
    def remove_mockup_library(self, request, pk=None):
        # Retrieve the product instance
        product = self.get_object()

        # Get the list of mockup library IDs to remove
        library_ids_to_remove = set(request.data.get('libraries', []))

        # Remove each library and clean up associated images
        for library_id in library_ids_to_remove:
            try:
                # Fetch the mockup library
                library = MockupLibrary.objects.get(id=library_id)
                
                # Remove the library from the product's relationship
                product.mockup_libraries.remove(library)

                # Retrieve and delete associated LibraryProductImage records and image files
                library_product_images = LibraryProductImage.objects.filter(product=product, library=library)
                
                for library_product_image in library_product_images:
                    # Construct the file path and delete the file if it exists
                    image_path = os.path.join(settings.MEDIA_ROOT, library_product_image.image_path.name)
                    if os.path.exists(image_path):
                        os.remove(image_path)

                    # Delete the LibraryProductImage record from the database
                    library_product_image.delete()

            except MockupLibrary.DoesNotExist:
                return Response({"error": f"MockupLibrary with ID {library_id} does not exist."}, status=status.HTTP_400_BAD_REQUEST)

        # Serialize and return the updated product data
        serializer = ProductsSerializer(product)
        return Response(serializer.data, status=status.HTTP_200_OK)
# class ProductsViewSet(viewsets.ModelViewSet):
#     queryset = Product.objects.all()
#     serializer_class = ProductsSerializer

#     @action(detail=True, methods=['patch'], url_path='add_mockup_library')
#     def add_mockup_library(self, request, pk=None):
#         # Retrieve the product instance
#         product = self.get_object()

#         # Get the list of mockup library IDs to add
#         library_ids_to_add = set(request.data.get('libraries', []))

#         # Add each library and iterate through its mockups
#         for library_id in library_ids_to_add:
#             try:
#                 library = MockupLibrary.objects.get(id=library_id)
#                 product.mockup_libraries.add(library)

#                 # Trigger image generation for each mockup in the library
#                 for mockup in library.mockups.all():
#                     # Define output path based on requested structure
#                     output_directory = os.path.join(
#                         settings.MEDIA_ROOT, 'products', 'library_mockups', 
#                         str(product.id), str(library_id)
#                     )
#                     output_filename = f"{product.designs.id}_{mockup.id}.png"
#                     output_path = os.path.join(output_directory, output_filename)

#                     # Ensure directory exists
#                     os.makedirs(output_directory, exist_ok=True)

#                     # Call the create_single_mockup function
#                     create_single_mockup(
#                         product.designs.id, mockup.id, 
#                         mockup.mockup_relative_path, product.designs.design_relative_path, 
#                         tuple(map(int, mockup.bbox.strip("()").split(","))),
#                         mockup.width, mockup.height, mockup.rotation, output_path
#                     )

#                     # Save the LibraryProductImage record for library-generated images
#                     relative_path = os.path.join(
#                         'products', 'library_mockups', str(product.id), str(library_id), output_filename
#                     )
#                     LibraryProductImage.objects.create(
#                         product=product, mockup=mockup, library=library, image_path=relative_path
#                     )

#             except MockupLibrary.DoesNotExist:
#                 return Response({"error": f"MockupLibrary with ID {library_id} does not exist."}, status=status.HTTP_400_BAD_REQUEST)

#         # Serialize and return the updated product data
#         serializer = ProductsSerializer(product)
#         return Response(serializer.data, status=status.HTTP_200_OK)

#     @action(detail=True, methods=['patch'], url_path='remove_mockup_library')
#     def remove_mockup_library(self, request, pk=None):
#         # Retrieve the product instance
#         product = self.get_object()

#         # Get the list of mockup library IDs to remove
#         library_ids_to_remove = set(request.data.get('libraries', []))

#         # Remove each library and clean up associated images
#         for library_id in library_ids_to_remove:
#             try:
#                 library = MockupLibrary.objects.get(id=library_id)
#                 product.mockup_libraries.remove(library)

#                 # Delete associated LibraryProductImage records and files for each mockup in the library
#                 for mockup in library.mockups.all():
#                     library_product_images = LibraryProductImage.objects.filter(product=product, mockup=mockup, library=library)
#                     for library_product_image in library_product_images:
#                         # Delete the image file from the file system
#                         image_path = os.path.join(settings.MEDIA_ROOT, library_product_image.image_path.name)
#                         if os.path.exists(image_path):
#                             os.remove(image_path)
#                         # Delete the LibraryProductImage record
#                         library_product_image.delete()

#             except MockupLibrary.DoesNotExist:
#                 return Response({"error": f"MockupLibrary with ID {library_id} does not exist."}, status=status.HTTP_400_BAD_REQUEST)

#         # Serialize and return the updated product data
#         serializer = ProductsSerializer(product)
#         return Response(serializer.data, status=status.HTTP_200_OK)

class ProductCategoryViewSet(viewsets.ModelViewSet):
    queryset = ProductCategory.objects.all()
    serializer_class = ProductCategorySerializer