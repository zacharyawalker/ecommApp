# Generated by Django 5.1.2 on 2024-10-25 13:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mockups', '0005_tag_mockup_tags'),
    ]

    operations = [
        migrations.AlterField(
            model_name='mockup',
            name='tags',
            field=models.ManyToManyField(blank=True, to='mockups.tag'),
        ),
    ]
