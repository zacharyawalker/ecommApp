# Generated by Django 5.1.2 on 2024-11-05 19:46

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mockups', '0023_rename_productcategory_mockupcategory_and_more'),
        ('products', '0008_alter_productimage_image_path'),
    ]

    operations = [
        migrations.CreateModel(
            name='LibraryProductImage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image_path', models.ImageField(upload_to='')),
                ('created_on', models.DateTimeField(auto_now_add=True)),
                ('library', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='library_mockup_images', to='mockups.mockuplibrary')),
                ('mockup', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='library_mockup_images', to='mockups.mockup')),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='library_mockup_images', to='products.product')),
            ],
        ),
    ]