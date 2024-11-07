# Generated by Django 5.1.2 on 2024-10-25 13:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mockups', '0004_alter_mockup_product_category'),
    ]

    operations = [
        migrations.CreateModel(
            name='Tag',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=50)),
            ],
        ),
        migrations.AddField(
            model_name='mockup',
            name='tags',
            field=models.ManyToManyField(blank=True, null=True, to='mockups.tag'),
        ),
    ]