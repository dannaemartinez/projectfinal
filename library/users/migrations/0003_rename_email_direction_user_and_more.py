# Generated by Django 4.0.3 on 2022-05-01 22:22

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_alter_direction_phone_alter_direction_zipcode'),
    ]

    operations = [
        migrations.RenameField(
            model_name='direction',
            old_name='email',
            new_name='user',
        ),
        migrations.AlterUniqueTogether(
            name='direction',
            unique_together={('user',)},
        ),
    ]
