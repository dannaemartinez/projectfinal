# Generated by Django 4.0.3 on 2022-05-01 20:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('songs', '0004_alter_album_physicalprice'),
    ]

    operations = [
        migrations.AlterField(
            model_name='song',
            name='digitalPrice',
            field=models.DecimalField(decimal_places=2, max_digits=5),
        ),
    ]