from library import serializers
from rest_framework_simplejwt.views import TokenObtainPairView
from typing_extensions import Required

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = serializers.CustomTokenObtainPairSerializer
