# Imports
from django.contrib.auth.models import AbstractUser
from django.db import models
#Class User
class User(AbstractUser):
	email = models.CharField(max_length=255, unique=True)
	username = models.CharField(max_length=255, unique=True)

#Tipos de User
	class Type(models.IntegerChoices):
		BUYER = 1
		ADMIN = 2

	type = models.IntegerField(choices = Type.choices, default = 1)

	def __str__(self):
		return f'{self.username}'

class Direction(models.Model):
	user = models.ForeignKey(User, related_name='DirectionWithUser', on_delete=models.DO_NOTHING)
	street = models.CharField(max_length=255, unique=True)
	zipcode = models.IntegerField()
	state_province = models.CharField(max_length=255, unique=True)
	city = models.CharField(max_length=255, unique=True)
	phone = models.IntegerField()

	class Meta:
		unique_together = (("user"),)