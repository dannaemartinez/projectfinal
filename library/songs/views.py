from rest_framework import viewsets
from rest_framework import views
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.decorators import action
from library.songs.serializers import *
import base64
from rest_framework.response import Response
from rest_framework.parsers import FormParser, FileUploadParser, MultiPartParser, JSONParser
from rest_framework import pagination
from django.utils.decorators import method_decorator

class GenreViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows CRUD of genres if the user is Admin.
    """
    queryset = Genre.objects.all().order_by('name')
    serializer_class = GenreSerializer
    permission_classes_by_action = {'list': [IsAuthenticated], 'retrive': [IsAuthenticated],
                                    'create': [IsAdminUser],'update': [IsAdminUser], 'partial_update': [IsAdminUser], 'destroy': [IsAdminUser]}

    # @action(detail=True, methods=[''])
    # def partial_update(self, request, pk='id'):
    #     genre = self.get_object()
    #     serializer = GenreSerializer(data=request.data)
    #     if serializer.is_valid():
    #         genre.partial_update(serializer.valid['name'])
    #         genre.save()
    #         return Response({'status':'genre set'})
    #     else:
    #         return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)


    # def destroy(self, request, pk='id'):
    #     pass



class SingerViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows CRUD of singers if the user is Admin.
    """
    queryset = Singer.objects.all().order_by('name')
    serializer_class = SingerSerializer
    permission_classes = [IsAuthenticated]

class AlbumViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows CRUD of albums if the user is Admin.
    """
    queryset = Album.objects.all().order_by('name')
    serializer_class = AlbumSerializer
    permission_classes = [IsAuthenticated]


class SongViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows CRUD of songs if the user is Admin.
    """
    queryset = Song.objects.all()
    serializer_class = SongSerializer
    permission_classes = [IsAuthenticated]