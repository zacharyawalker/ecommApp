import logging
from django.db.models.signals import m2m_changed
from django.dispatch import receiver
from .models import Design
from mockups.models import Mockup, MockupLibrary
from mockups.utils import create_single_mockup, create_library_mockup


@receiver(m2m_changed, sender=Design.mockups.through)
def handle_single_mockup_assignment(sender, instance, action, **kwargs):
    if action == 'post_add':

        mockup_id = next(iter(kwargs.get('pk_set', [])), None)
        if mockup_id:
            try:
                mockup = Mockup.objects.get(id=mockup_id)
                
                # Extract required data
                design_relative_path = instance.design_relative_path
                design_title = instance.title
                design_id = instance.id

                mockup_relative_path = mockup.mockup_relative_path
                # Convert bbox from string to tuple of integers
                bbox = tuple(map(int, mockup.bbox.strip("()").split(",")))
                width = mockup.width
                height = mockup.height
                rotation = mockup.rotation

                create_single_mockup(design_id, mockup_id, mockup_relative_path, design_relative_path, bbox, width, height, rotation)
            except Mockup.DoesNotExist:
                print(f"Mockup with id {mockup_id} does not exist.")
        else:
            print("No mockup ID provided in the signal.")

@receiver(m2m_changed, sender=Design.mockup_libraries.through)
def handle_mockup_library_assignment(sender, instance, action, **kwargs):
    if action == 'post_add':
        library_id = next(iter(kwargs.get('pk_set', [])), None)
        if library_id:
            try:
                mockup_library = MockupLibrary.objects.get(id=library_id)
                
                # Iterate through each mockup in the library
                for mockup in mockup_library.mockups.all():
                    # Extract required data
                    design_relative_path = instance.design_relative_path
                    design_title = instance.title
                    design_id = instance.id

                    mockup_relative_path = mockup.mockup_relative_path
                    # Convert bbox from string to tuple of integers
                    bbox = tuple(map(int, mockup.bbox.strip("()").split(",")))
                    width = mockup.width
                    height = mockup.height
                    rotation = mockup.rotation

                    # Process each mockup in the library
                    create_library_mockup(design_id, mockup.id, mockup_relative_path, design_relative_path, bbox, width, height, rotation)
                    
            except MockupLibrary.DoesNotExist:
                print(f"MockupLibrary with id {library_id} does not exist.")
        else:
            print("No library ID provided in the signal.")