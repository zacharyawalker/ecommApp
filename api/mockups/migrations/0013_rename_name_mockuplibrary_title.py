# Generated by Django 5.1.2 on 2024-10-26 03:32

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('mockups', '0012_remove_mockuplibrary_mockups'),
    ]

    operations = [
        migrations.RenameField(
            model_name='mockuplibrary',
            old_name='name',
            new_name='title',
        ),
    ]