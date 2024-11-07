from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Mockup
from .utils import get_parameters

@receiver(post_save, sender=Mockup)
def calculate_parameters_after_upload(sender, instance, **kwargs):
    # Check if the `mockup_box_image` has been uploaded
    # Only analyze if bbox, width, and height aren't already set (i.e., not already analyzed)
    if instance.mockup_box_image and not instance.bbox and not instance.width and not instance.height and not instance.rotation:
        image_path = instance.mockup_box_image.path  # Get the file path of the uploaded image

        # Call your analysis script and get the results (bbox, width, height, rotation)
        parameters = get_parameters(image_path)

        # Update the mockup instance with the analysis data
        instance.bbox = parameters.get('bbox')
        instance.width = parameters.get('width')
        instance.height = parameters.get('height')
        instance.rotation = parameters.get('rotation')
        instance.save()  # Save the updated mockup instance
