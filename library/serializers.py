from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from library.users.models import Users
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    """Customizes JWT default Serializer to add more information about user"""
    @classmethod
    def get_token(cls, User):
        token = super().get_token(User)
        token['name'] = User.name
        token['email'] = User.email

        return token
