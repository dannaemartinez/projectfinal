# Generated by Django 4.0.3 on 2022-05-05 17:11

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('sales', '0008_rename_clientuser_sale_email'),
    ]

    operations = [
        migrations.RenameField(
            model_name='direction',
            old_name='user',
            new_name='email',
        ),
        migrations.AlterUniqueTogether(
            name='direction',
            unique_together={('email',)},
        ),
    ]
