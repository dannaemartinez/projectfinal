from rest_framework import serializers
from .models import *

class SaleSerializer(serializers.ModelSerializer):
	class Meta:
		model = Sale
		fields = ['id', 'buyDate', 'clientUser', 'total']

class Item_SaleSerializer(serializers.ModelSerializer):
	#songs = serializers.StringRelatedField(many=True)
	class Meta:
		model = Item_Sale
		fields = ['id', 'songs', 'sale', 'album', 'type_sale', 'finalPrice']

        