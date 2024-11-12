# import logging
# import os
# from django.db.models.signals import post_save, m2m_changed
# from django.dispatch import receiver
# from .models import Product
# from mockups.models import Mockup, MockupLibrary
# from mockups.utils import create_single_mockup, create_library_mockup


# @receiver(post_save, sender=Product)
# def handle_product_creation(sender, instance, created, **kwargs):
#     if created and instance.designs and instance.mockups.exists():
#         # Change status to 'In Progress' if it's still 'New'
#         if instance.status == Product.StatusChoices.New:
#             instance.status = Product.StatusChoices.InProgress
#             instance.save(update_fields=['status'])
        
#         # Trigger the creation of mockups for all assigned mockups
#         for mockup in instance.mockups.all():
#             process_single_mockup(instance, mockup)

#         # Trigger the creation of mockups for all assigned libraries
#         for mockup_library in instance.mockup_libraries.all():
#             process_mockup_library(instance, mockup_library)


# def process_single_mockup(instance, mockup):
#     # Extract required data
#     design_relative_path = instance.designs.design_relative_path
#     design_id = instance.designs.id
#     mockup_relative_path = mockup.mockup_relative_path

#     # Convert bbox from string to tuple of integers
#     bbox = tuple(map(int, mockup.bbox.strip("()").split(",")))
#     width = mockup.width
#     height = mockup.height
#     rotation = mockup.rotation

#     # Call utility function to create single mockup image
#     create_single_mockup(design_id, mockup.id, mockup_relative_path, design_relative_path, bbox, width, height, rotation)


# @receiver(m2m_changed, sender=Product.mockups.through)
# def handle_single_mockup_assignment(sender, instance, action, **kwargs):
#     if action == 'post_add':
#         mockup_id = next(iter(kwargs.get('pk_set', [])), None)
#         if mockup_id:
#             try:
#                 mockup = Mockup.objects.get(id=mockup_id)
                
#                 # Update the status to 'In Progress' if it's still 'New'
#                 if instance.status == Product.StatusChoices.New:
#                     instance.status = Product.StatusChoices.InProgress
#                     instance.save(update_fields=['status'])
                
#                 # Process the newly assigned mockup
#                 process_single_mockup(instance, mockup)
#             except Mockup.DoesNotExist:
#                 logging.error(f"Mockup with id {mockup_id} does not exist.")


# def process_mockup_library(instance, mockup_library):
#     # Iterate through each mockup in the library
#     for mockup in mockup_library.mockups.all():
#         process_single_mockup(instance, mockup)


# @receiver(m2m_changed, sender=Product.mockup_libraries.through)
# def handle_mockup_library_assignment(sender, instance, action, **kwargs):
#     if action == 'post_add':
#         library_id = next(iter(kwargs.get('pk_set', [])), None)
#         if library_id:
#             try:
#                 mockup_library = MockupLibrary.objects.get(id=library_id)
                
#                 # Update the status to 'In Progress' if it's still 'New'
#                 if instance.status == Product.StatusChoices.New:
#                     instance.status = Product.StatusChoices.InProgress
#                     instance.save(update_fields=['status'])
                
#                 # Process all mockups in the assigned library
#                 process_mockup_library(instance, mockup_library)
#             except MockupLibrary.DoesNotExist:
#                 logging.error(f"MockupLibrary with id {library_id} does not exist.")

import logging
import os
from django.db.models.signals import post_save, m2m_changed
from django.dispatch import receiver
from django.conf import settings
from .models import *
from mockups.models import *
from mockups.utils import create_single_mockup, create_library_mockup

@receiver(post_save, sender=Product)
def handle_product_creation(sender, instance, created, **kwargs):
    if created and instance.designs and instance.mockups.exists():
        # Change status to 'In Progress' if it's still 'New'
        if instance.status == Product.StatusChoices.New:
            instance.status = Product.StatusChoices.InProgress
            instance.save(update_fields=['status'])
        
        # Trigger the creation of mockups for all assigned mockups
        for mockup in instance.mockups.all():
            process_single_mockup(instance, mockup)

        # Trigger the creation of mockups for all assigned libraries
        for mockup_library in instance.mockup_libraries.all():
            process_mockup_library(instance, mockup_library)


def process_single_mockup(instance, mockup):
    # Extract required data
    product_id = instance.id
    design = instance.designs
    design_relative_path = design.design_relative_path
    design_id = design.id
    mockup_relative_path = mockup.mockup_relative_path

    # Convert bbox from string to tuple of integers
    bbox = tuple(map(int, mockup.bbox.strip("()").split(",")))
    width = mockup.width
    height = mockup.height
    rotation = mockup.rotation

    # Define the output path for the generated image
    output_directory = os.path.join(settings.MEDIA_ROOT, 'products', 'single_mockups', str(product_id))
    output_filename = f"{design_id}_{mockup.id}.png"
    output_path = os.path.join(output_directory, output_filename)
    
    # Ensure the output directory exists, or create it
    os.makedirs(output_directory, exist_ok=True)

    # Call utility function to create single mockup image with the specified output path
    create_single_mockup(design_id, mockup.id, mockup_relative_path, design_relative_path, bbox, width, height, rotation, output_path)

    # Create a ProductImage record linking the image to the product and mockup
    relative_path = os.path.join('products', 'single_mockups', str(product_id), output_filename)
    ProductImage.objects.create(product=instance, mockup=mockup, image_path=relative_path)

@receiver(m2m_changed, sender=Product.mockups.through)
def handle_single_mockup_assignment(sender, instance, action, **kwargs):
    if action == 'post_add':
        mockup_id = next(iter(kwargs.get('pk_set', [])), None)
        if mockup_id:
            try:
                mockup = Mockup.objects.get(id=mockup_id)
                
                # Update the status to 'In Progress' if it's still 'New'
                if instance.status == Product.StatusChoices.New:
                    instance.status = Product.StatusChoices.InProgress
                    instance.save(update_fields=['status'])
                
                # Process the newly assigned mockup
                process_single_mockup(instance, mockup)
            except Mockup.DoesNotExist:
                logging.error(f"Mockup with id {mockup_id} does not exist.")


def process_mockup_library(instance, mockup_library):
    # Iterate through each mockup in the library
    for mockup in mockup_library.mockups.all():
        process_single_mockup(instance, mockup)


# @receiver(m2m_changed, sender=Product.mockup_libraries.through)
# def handle_mockup_library_assignment(sender, instance, action, **kwargs):
#     if action == 'post_add':
#         library_id = next(iter(kwargs.get('pk_set', [])), None)
#         if library_id:
#             try:
#                 mockup_library = MockupLibrary.objects.get(id=library_id)
                
#                 # Update the status to 'In Progress' if it's still 'New'
#                 if instance.status == Product.StatusChoices.New:
#                     instance.status = Product.StatusChoices.InProgress
#                     instance.save(update_fields=['status'])
                
#                 # Process all mockups in the assigned library
#                 process_mockup_library(instance, mockup_library)
#             except MockupLibrary.DoesNotExist:
#                 logging.error(f"MockupLibrary with id {library_id} does not exist.")

@receiver(m2m_changed, sender=Product.mockup_libraries.through)
def handle_mockup_library_assignment(sender, instance, action, **kwargs):
    if action == 'post_add':
        library_id = next(iter(kwargs.get('pk_set', [])), None)
        
        if library_id:
            try:
                library = MockupLibrary.objects.get(id=library_id)
                
                # Generate images for each mockup in the library
                for mockup in library.mockups.all():
                    # Define output path based on requested structure
                    output_directory = os.path.join(
                        settings.MEDIA_ROOT, 'products', 'library_mockups', 
                        str(instance.id), str(library_id)
                    )
                    output_filename = f"{instance.designs.id}_{mockup.id}.png"
                    output_path = os.path.join(output_directory, output_filename)

                    # Ensure directory exists
                    os.makedirs(output_directory, exist_ok=True)

                    # Call the create_single_mockup function
                    create_single_mockup(
                        instance.designs.id, mockup.id, 
                        mockup.mockup_relative_path, instance.designs.design_relative_path, 
                        tuple(map(int, mockup.bbox.strip("()").split(","))),
                        mockup.width, mockup.height, mockup.rotation, output_path
                    )

                    # Save the LibraryProductImage record for library-generated images
                    relative_path = os.path.join(
                        'products', 'library_mockups', str(instance.id), str(library_id), output_filename
                    )
                    LibraryProductImage.objects.create(
                        product=instance, mockup=mockup, library=library, image_path=relative_path
                    )

            except MockupLibrary.DoesNotExist:
                logging.error(f"MockupLibrary with ID {library_id} does not exist.")



@receiver(m2m_changed, sender=Product.mockups.through)
def remove_mockup_images_on_mockup_remove(sender, instance, action, pk_set, **kwargs):
    """
    When a mockup is removed from a product, delete the associated ProductImage record and image file.
    """
    if action == "post_remove":
        for mockup_id in pk_set:
            try:
                # Find the ProductImage associated with this product and mockup
                product_image = ProductImage.objects.get(product=instance, mockup_id=mockup_id)

                # Delete the file from the file system
                if product_image.image_path:
                    image_path = os.path.join(settings.MEDIA_ROOT, product_image.image_path.name)
                    if os.path.isfile(image_path):
                        os.remove(image_path)
                
                # Delete the ProductImage record
                product_image.delete()

            except ProductImage.DoesNotExist:
                # If there's no matching ProductImage, we can safely ignore
                continue