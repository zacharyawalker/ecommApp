# Generated by Django 5.1.2 on 2024-10-28 16:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('designs', '0004_alter_design_design_relative_path'),
    ]

    operations = [
        migrations.AlterField(
            model_name='design',
            name='design_relative_path',
            field=models.CharField(editable=False, max_length=255),
        ),
    ]
