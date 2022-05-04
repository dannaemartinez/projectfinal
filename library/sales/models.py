from enum import unique
from django.db import models
from library.songs.models import Song
from library.songs.models import Album
from library.users.models import User

# Create your models here.
class Sale(models.Model):
	clientUser = models.ForeignKey(User, related_name='SaleWithUser',on_delete=models.DO_NOTHING)
	buyDate = models.DateTimeField(auto_now_add=True, null=True)
	total = models.DecimalField(decimal_places=2, max_digits=4, default=0)

	def __str__(self):
	 	return f'{self.clientUser} {self.buyDate}'

class Item_Sale(models.Model):
	sale = models.ForeignKey(Sale, related_name='Item_SaleWithSale', on_delete=models.DO_NOTHING)
	songs = models.ForeignKey(Song, related_name='Item_SaleWithSong', on_delete=models.DO_NOTHING)
	albums = models.ForeignKey(Album, related_name='Item_SaleWithAlbum', on_delete=models.DO_NOTHING)
	#type_sale = models.BooleanField(physical | digital)
	finalPrice = models.DecimalField(max_digits=5, decimal_places=2)
	
	class Meta:
		unique_together = (("sale"),)

class Direction(models.Model):
	user = models.ForeignKey(User, related_name='DirectionWithUser', on_delete=models.DO_NOTHING)
	street = models.CharField(max_length=255, unique=True)
	zipcode = models.IntegerField()
	state_province = models.CharField(max_length=255, unique=True)
	city = models.CharField(max_length=255, unique=True)
	phone = models.IntegerField()

	class Meta:
		unique_together = (("user"),)




	