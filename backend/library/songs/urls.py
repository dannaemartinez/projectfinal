from . import views
from rest_framework import routers
from django.urls import path, include

router = routers.DefaultRouter()
# router.register(r'genre', views.GenreViewSet)
# router.register(r'singer', views.SingerViewSet)
# router.register(r'album', views.AlbumViewSet)
# router.register(r'songs', views.SongViewSet)

urlpatterns = [
	path('', include(router.urls)),
]