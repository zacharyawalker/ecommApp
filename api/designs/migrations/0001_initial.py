# Generated by Django 5.1.2 on 2024-10-24 21:29

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Design',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_on', models.DateTimeField(auto_created=True, auto_now_add=True, null=True)),
                ('title', models.CharField(max_length=200, verbose_name='Title')),
                ('description', models.TextField(verbose_name='Description')),
                ('design_image', models.ImageField(blank=True, null=True, upload_to='design_images/', verbose_name='Design Image')),
                ('status', models.CharField(choices=[('New', 'New'), ('In Progress', 'Inprogress'), ('Ready for Publishing', 'Readyforpublishing'), ('Published', 'Published'), ('Retired', 'Retired'), ('Deleted', 'Deleted')], default='New', max_length=30, verbose_name='Status')),
            ],
        ),
    ]
