from django.db import models

class Idea(models.Model):

    title = models.CharField(max_length=200, verbose_name="Title")
    created_on = models.DateTimeField(auto_created=True, auto_now_add=True, blank=True, null=True)
    idea_image = models.ImageField(upload_to='idea_images/', verbose_name="Idea Image", blank=True,null=True)
    notes = models.TextField(blank=True)

    def __str__(self):
        return f"Title: {self.title}"