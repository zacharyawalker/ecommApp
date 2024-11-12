from django.db import models
from mockups.models import *



class Design(models.Model):
    
    title = models.CharField(max_length=200, verbose_name="Title")
    description = models.TextField(verbose_name="Description")
    design_image = models.ImageField(upload_to='design_images/', verbose_name="Design Image", blank=True, null=True)
    design_relative_path = models.CharField(max_length=255, editable=False)
    file_name = models.CharField(max_length=255, verbose_name='Design File Name', editable=False)
    #status = models.CharField(verbose_name="Status", max_length=30, choices=StatusChoices.choices,
                              #default=StatusChoices.New)
    created_on = models.DateTimeField(auto_created=True, auto_now_add=True, blank=True, null=True)

    #mockups = models.ManyToManyField(Mockup, blank=True, related_name='designs')
    #mockup_libraries = models.ManyToManyField(MockupLibrary, blank=True, related_name='designs')

    def save(self, *args, **kwargs):
        # Save initially to get an ID if it's a new object
        is_new = self.pk is None
        super().save(*args, **kwargs)

        # Rename file if it's a new object and design_image is provided
        if is_new and self.design_image:
            # Define new filename based on the ID
            new_filename = f"{self.pk}.png"
            old_path = self.design_image.path
            new_path = os.path.join(os.path.dirname(old_path), new_filename)

            # Rename the file on the filesystem
            os.rename(old_path, new_path)

            # Update the design_image and design_relative_path fields with the new filename
            self.design_image.name = f'design_images/{new_filename}'
            self.design_relative_path = f'/Users/zach/development/ecommApp/api/media/design_images/{new_filename}'
            self.file_name = new_filename
            super().save(update_fields=['design_image', 'design_relative_path', 'file_name'])
            
    def __str__(self):
        return self.title


