# Generated by Django 4.0.3 on 2022-05-04 17:16

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0004_rename_type_user_mode_alter_user_username'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Direction',
        ),
    ]