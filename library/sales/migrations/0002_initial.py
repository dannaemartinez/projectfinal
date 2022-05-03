# Generated by Django 4.0.3 on 2022-05-01 18:50

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('songs', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('sales', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='sale',
            name='clientUser',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='SaleWithUser', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='playlist',
            name='song_sale',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='PlaylistWithSong_Sale', to='sales.song_sale'),
        ),
        migrations.AddField(
            model_name='playlist',
            name='songs',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='PlaylistWithSongs', to='songs.song'),
        ),
        migrations.AlterUniqueTogether(
            name='song_sale',
            unique_together={('sale',)},
        ),
    ]