# Generated by Django 5.1.2 on 2024-11-10 23:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mockups', '0023_rename_productcategory_mockupcategory_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='mockup',
            name='gender',
            field=models.CharField(choices=[('Neutral', 'Neutral'), ('Unisex', 'Unisex'), ('Male', 'Male'), ('Female', 'Female'), ('Coed', 'Coed')], default='Neutral', max_length=10),
        ),
    ]
