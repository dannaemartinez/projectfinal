from rest_framework import serializers
from .models import *

class GenreSerializer(serializers.ModelSerializer):
	class Meta:
		model = Genre
		fields = ['id', 'name']

		def create(self, validate_data):
			return Snip

class SingerSerializer(serializers.ModelSerializer):
	class Meta:
		model = Singer
		fields = ['id', 'stageName', 'name', 'lastName', 'nationality', 'image']

class AlbumSerializer(serializers.ModelSerializer):
	class Meta:
		model = Album
		fields = ['id', 'name', 'singer', 'releaseDate', 'physicalPrice', 'genre', 'stock', 'image']


class SongSerializer(serializers.ModelSerializer):
	class Meta:
		model = Song
		fields = ['id', 'name', 'singer', 'releaseDate', 'album', 'duration', 'completeFile', 'previewFile', 'digitalPrice']
