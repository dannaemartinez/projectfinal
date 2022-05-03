# Generated by Django 4.0.3 on 2022-05-01 18:50

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Album',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=128)),
                ('releaseDate', models.DateTimeField(auto_now_add=True, null=True)),
                ('physicalPrice', models.DecimalField(decimal_places=2, max_digits=4)),
                ('stock', models.IntegerField()),
                ('image', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Genre',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=70)),
            ],
        ),
        migrations.CreateModel(
            name='Singer',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('stageName', models.CharField(max_length=70)),
                ('name', models.CharField(max_length=128)),
                ('last_name', models.CharField(max_length=128, null=True)),
                ('nationality', models.CharField(max_length=128)),
                ('image', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Song',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=45)),
                ('releaseDate', models.DateTimeField(auto_now_add=True, null=True)),
                ('duration', models.IntegerField(max_length=60)),
                ('completeFile', models.TextField()),
                ('previewFile', models.TextField()),
                ('digitalPrice', models.DecimalField(decimal_places=2, max_digits=4)),
                ('album', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='SongWithAlbum', to='songs.album')),
                ('singer', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='SongWithSinger', to='songs.singer')),
            ],
        ),
        migrations.AddField(
            model_name='album',
            name='genre',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='AlbumWithGenre', to='songs.genre'),
        ),
        migrations.AddField(
            model_name='album',
            name='singer',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='AlbumWithSinger', to='songs.singer'),
        ),
    ]