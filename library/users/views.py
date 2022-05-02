#from django.contrib.auth.models import User, Group
from django.contrib.auth.models import Group
# Changes
from library.users.models import User, Direction
from rest_framework import viewsets
from rest_framework.generics import GenericAPIView
from rest_framework.views import APIView
from rest_framework import permissions
from library.users.serializers import UserSerializer, GroupSerializer, RefreshTokenSerializer, DirectionSerializer
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from rest_framework import status

class LoginView(APIView):
    def post(self, request):
        email = request.data['email']
        password = request.data['password']

        user = User.objects.filter(email=email).first()

        if user is None:
            raise AuthenticationFailed('Email is not register yet!')

        if not user.check_password(password):
            raise AuthenticationFailed('Incorrect password!')

        response = Response()
        response.data = {
            'id': user.id,
            'email': user.email,
            #changes
            'type': user.type
        }
        return response

class LogoutView(GenericAPIView):
    serializer_class = RefreshTokenSerializer
    permission_classes = (permissions.IsAuthenticated, )

    def post(self, request, *args):
        sz = self.get_serializer(data=request.data)
        sz.is_valid(raise_exception=True)
        sz.save()
        return Response(status=status.HTTP_204_NO_CONTENT)


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = []

    def set_staff_as_type(request):
        if request.data['type'] == '2':
            request.data['is_staff'] = True
        else:
            request.data['is_staff'] = False
        return request
    
    def create(self, request):
        #set_staff_as_type(request)
        serializer = UserSerializer(data = request.data)
        serializer.is_valid(raise_exception = True)
        serializer.save()
        return Response(serializer.data)

    def update(self, request, pk=None):
        pass

    def partial_update(self, request, pk=None):
        pass

class DirectionViewSet(viewsets.ModelViewSet):
    queryset = Direction.objects.all()
    serializer_class = DirectionSerializer
    permission_classes = [permissions.IsAuthenticated]

class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]