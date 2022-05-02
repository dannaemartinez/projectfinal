from rest_framework import viewsets
from rest_framework import permissions
from library.sales.serializer import *

class SaleViewSet(viewsets.ModelViewSet):
    queryset = Sale.objects.all()
    serializer_class = SaleSerializer
    permission_classes = []

class Item_Sale_ViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows CREATE physical sale of songs if the user is Custumer.
    """
    queryset = Item_Sale.objects.all()
    serializer_class = Item_SaleSerializer
    permission_classes = []


