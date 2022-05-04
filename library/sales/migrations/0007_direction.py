# Generated by Django 4.0.3 on 2022-05-04 17:16

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('sales', '0006_item_sale_delete_song_sale'),
    ]

    operations = [
        migrations.CreateModel(
            name='Direction',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('street', models.CharField(max_length=255, unique=True)),
                ('zipcode', models.IntegerField()),
                ('state_province', models.CharField(max_length=255, unique=True)),
                ('city', models.CharField(max_length=255, unique=True)),
                ('phone', models.IntegerField()),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='DirectionWithUser', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'unique_together': {('user',)},
            },
        ),
    ]
