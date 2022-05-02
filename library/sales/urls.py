from . import views
from rest_framework import routers
from django.urls import path, include

router = routers.DefaultRouter()
router.register(r'sale', views.SaleViewSet)
router.register(r'item_sale', views.Item_Sale_ViewSet)

urlpatterns = [
	path('', include(router.urls)),
]