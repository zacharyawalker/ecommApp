# Generated by Django 5.1.2 on 2024-11-04 21:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0007_productimage_mockup'),
    ]

    operations = [
        migrations.AlterField(
            model_name='productimage',
            name='image_path',
            field=models.ImageField(upload_to=''),
        ),
    ]
