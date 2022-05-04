# Imports
# Changes
from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
	email = models.CharField(max_length=255, unique=True)
	
	class Mode(models.IntegerChoices):
		BUYER = 1
		ADMIN = 2

	mode = models.IntegerField(choices = Mode.choices, default = 1)

class Direction(models.Model):
	user = models.ForeignKey(User, related_name='DirectionWithUser', on_delete=models.DO_NOTHING)
	street = models.CharField(max_length=255, unique=True)
	zipcode = models.IntegerField()
	state_province = models.CharField(max_length=255, unique=True)
	city = models.CharField(max_length=255, unique=True)
	phone = models.IntegerField()

	class Meta:
		unique_together = (("user"),)