# Generated by Django 5.1.2 on 2024-11-04 16:50

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('designs', '0008_remove_design_mockup_libraries_remove_design_mockups'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='design',
            name='status',
        ),
    ]
