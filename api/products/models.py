from django.db import models
from mockups.models import *
from designs.models import *

class ProductCategory(models.Model):
    title = models.CharField(max_length=100)
    division = models.CharField(max_length=75)
    department = models.CharField(max_length=75)
    item = models.CharField(max_length=75)


    def __str__(self):
        return self.title

class Product(models.Model):
    class StatusChoices(models.TextChoices):
        New = "New"
        InProgress = "In Progress"
        Published = "Published"
        Retired = "Retired"
        Deleted = "Deleted"

    title = models.CharField(max_length=200, verbose_name="Title")
    description = models.TextField(verbose_name="Description")
    status = models.CharField(verbose_name="Status", max_length=30, choices=StatusChoices.choices,
                              default=StatusChoices.New)
    created_on = models.DateTimeField(auto_created=True, auto_now_add=True, blank=True, null=True)

    product_category = models.ForeignKey(ProductCategory, related_name='product_category', on_delete=models.CASCADE, null=True)

    designs = models.ForeignKey(Design, on_delete=models.CASCADE, related_name='products')
    mockups = models.ManyToManyField(Mockup, blank=True, related_name='products')
    mockup_libraries = models.ManyToManyField(MockupLibrary, blank=True, related_name='products')
            
    def __str__(self):
        return f"Title: {self.title}"
    

class ProductImage(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='product_images')
    mockup = models.ForeignKey(Mockup, on_delete=models.CASCADE, related_name='mockup', null=True)
    image_path = models.ImageField()
    created_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Image for {self.product.title} - {self.image_path.name}"


class LibraryProductImage(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='library_product_images')  # Update this to match the serializer
    mockup = models.ForeignKey(Mockup, on_delete=models.CASCADE, related_name='library_mockup_images')
    library = models.ForeignKey(MockupLibrary, on_delete=models.CASCADE, related_name='library_mockup_images')
    image_path = models.ImageField()
    created_on = models.DateTimeField(auto_now_add=True)
