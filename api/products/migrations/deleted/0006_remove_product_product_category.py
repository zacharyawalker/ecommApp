# Generated by Django 5.1.2 on 2024-11-04 18:52

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0005_alter_product_product_category'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='product',
            name='product_category',
        ),
    ]
