from django.db import models
from django.core.exceptions import ValidationError
import os


class MockupCategory(models.Model):
    title = models.CharField(max_length=50, verbose_name='Product Category')
    
    def __str__(self):
        return self.title

class Tag(models.Model):
    title = models.CharField(max_length=50)

    def __str__(self):
        return self.title
    
class Color(models.Model):
    category = models.CharField(max_length=50, verbose_name="color_category", null=True)
    title = models.CharField(max_length=50, verbose_name="color", unique=False)
    hex_code = models.CharField(max_length=20, verbose_name="hex_code")

    def __str__(self):
        return f"{self.category} - {self.title} - {self.hex_code}"

class Mockup(models.Model):
    class GenderChoices(models.TextChoices):
        Neutral = "Neutral"
        Unisex = "Unisex"
        Male = "Male"
        Female = "Female"
        Coed = "Coed"

    title = models.CharField(max_length=200, verbose_name="Title")
    created_on = models.DateTimeField(auto_created=True, auto_now_add=True, blank=True, null=True)
    mockup_image = models.ImageField(upload_to='mockups/production_mockups/', verbose_name="Mockup Image", blank=True, null=True)
    mockup_box_image = models.ImageField(upload_to='mockups/box_mockups/', verbose_name="Mockup Box Image", blank=True, null=True)
    mockup_relative_path = models.CharField(max_length=255, editable=False)
    gender = models.CharField(max_length=10, choices=GenderChoices.choices, default=GenderChoices.Neutral)
    bbox = models.CharField(max_length=50, verbose_name="Bbox", null=True, default=None)
    height = models.IntegerField(verbose_name="Height", null=True, default=None)
    width = models.IntegerField(verbose_name="Width", null=True, default=None)
    rotation = models.FloatField(verbose_name="Rotation", null=True, default=None)

    mockup_category = models.ForeignKey(MockupCategory, on_delete=models.CASCADE, related_name='mockups')
    tags = models.ManyToManyField(Tag, blank=True)
    color = models.ForeignKey(Color, on_delete=models.SET_NULL, null=True, blank=True, related_name='mockups')
    

    def save(self, *args, **kwargs):
        # Save initially to get an ID if it's a new object
        is_new = self.pk is None
        super().save(*args, **kwargs)

        # Rename files if it's a new object and images are provided
        updated_fields = []

        if is_new and self.mockup_image:
            new_mockup_image_filename = f"prod_{self.pk}.png"
            old_mockup_image_path = self.mockup_image.path
            new_mockup_image_path = os.path.join(os.path.dirname(old_mockup_image_path), new_mockup_image_filename)

            # Rename the file on the filesystem
            os.rename(old_mockup_image_path, new_mockup_image_path)

            # Update the mockup_image field with the new filename
            self.mockup_image.name = f'mockups/production_mockups/{new_mockup_image_filename}'
            updated_fields.append('mockup_image')

        if is_new and self.mockup_box_image:
            new_mockup_box_filename = f"box_{self.pk}.png"
            old_mockup_box_path = self.mockup_box_image.path
            new_mockup_box_path = os.path.join(os.path.dirname(old_mockup_box_path), new_mockup_box_filename)

            # Rename the file on the filesystem
            os.rename(old_mockup_box_path, new_mockup_box_path)

            # Update the mockup_box_image field with the new filename
            self.mockup_box_image.name = f'mockups/box_mockups/{new_mockup_box_filename}'
            updated_fields.append('mockup_box_image')

        # Update the mockup_relative_path and save updated fields
        if self.mockup_image:
            self.mockup_relative_path = f'/Users/zach/development/ecommApp/api/media/{self.mockup_image.name}'
            updated_fields.append('mockup_relative_path')

        if updated_fields:
            super().save(update_fields=updated_fields)

    def __str__(self):
        return f"Title: {self.title}"
    
class MockupLibrary(models.Model):
    title = models.CharField(max_length=50)
    description = models.TextField(null=True)
    mockups = models.ManyToManyField(Mockup, blank=True)

    def __str__(self):
        return self.title
    


