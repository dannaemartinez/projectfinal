from django.db import models

class Genre(models.Model):
	name = models.CharField(max_length=70)

	def __str__(self):
	 	return f'{self.name}'

class Singer(models.Model):
	stageName = models.CharField(max_length=70)
	name = models.CharField(max_length=128)
	lastName = models.CharField(max_length=128, null=True)
	nationality = models.CharField(max_length=128)
	image = models.TextField()

	def __str__(self):
	 	return f'{self.stageName}'

class Album(models.Model):
	name = models.CharField(max_length=128)
	singer = models.ForeignKey(Singer, related_name='AlbumWithSinger', on_delete=models.DO_NOTHING)
	releaseDate = models.DateTimeField(auto_now_add=True, null=True)
	physicalPrice = models.DecimalField(max_digits=5, decimal_places=2)
	genre = models.ForeignKey(Genre, related_name='AlbumWithGenre', on_delete=models.DO_NOTHING)
	stock = models.IntegerField()
	image = models.TextField()

	def __str__(self):
	 	return f'{self.name}'

class Song(models.Model):
	name = models.CharField(max_length = 45)
	singer = models.ForeignKey(Singer, related_name='SongWithSinger', on_delete=models.DO_NOTHING)
	releaseDate = models.DateTimeField(auto_now_add=True, null=True)
	album = models.ForeignKey(Album, related_name='SongWithAlbum', on_delete=models.DO_NOTHING)
	duration = models.IntegerField()
	completeFile = models.TextField(null=False)
	previewFile = models.TextField(null=False)
	digitalPrice = models.DecimalField(max_digits=5, decimal_places=2)


	def __str__(self):
		return f'{self.name}, {self.singer}'