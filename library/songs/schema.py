from cmath import sin
from datetime import datetime
from email.mime import image
import graphene
from graphene_django import DjangoObjectType
from graphene.types.field import Field
from library.songs.models import *
from typing_extensions import Required
class GenreType(DjangoObjectType):
    class Meta:
        model = Genre
        fields = '__all__'
class SingerType(DjangoObjectType):
    class Meta:
        model = Singer
        fields = '__all__'
class AlbumType(DjangoObjectType):
    class Meta:
        model = Album
        fields = '__all__'
class SongType(DjangoObjectType):
    class Meta:
        model = Song
        fields = '__all__'
class GenreQuery(graphene.ObjectType):
    all_genres = graphene.List(
        GenreType, first=graphene.Int(), skip=graphene.Int())
    genres_by_name = graphene.List(
        GenreType, name=graphene.String(required=True))
    def resolve_all_genres(root, info, first=None, skip=None):
        from django.contrib.auth.middleware import get_user
        from graphql_jwt.utils import get_payload, get_user_by_payload
        # context = info.context
        # print('info',dir(context))
        # user = info.context.user
        # print('IS AUTHENTICATED? ', user.is_authenticated)
        # if not user.is_authenticated:
        #     raise Exception("Authentication credentials were not provided")
        genres = Genre.objects.all()
        if skip is not None:
            genres = genres[:skip]
        if first is not None:
            genres = genres[first:]
        return genres
    def resolve_genre_by_name(root, info, name):
        try:
            return Genre.objects.filter(name=name)
        except Genre.DoesNotExist:
            return None
class SingerQuery(graphene.ObjectType):
    all_singers = graphene.List(
        SingerType, first=graphene.Int(), skip=graphene.Int())
    singer_by_name = graphene.List(
        SingerType, name=graphene.String(required=True))
    def resolve_all_singers(root, info, first=None, skip=None):
        from django.contrib.auth.middleware import get_user
        from graphql_jwt.utils import get_payload, get_user_by_payload
        # context = info.context
        # print('info',dir(context))
        # user = info.context.user
        # print('IS AUTHENTICATED? ', user.is_authenticated)
        # if not user.is_authenticated:
        #     raise Exception("Authentication credentials were not provided")
        singers = Singer.objects.all()
        if skip is not None:
            singers = singers[:skip]
        if first is not None:
            singers = singers[first:]
        return singers
    def resolve_singer_by_name(root, info, name):
        try:
            return Singer.objects.filter(name=name)
        except Singer.DoesNotExist:
            return None
    # def resolve_singer_by_name(root, info, name, lastName, nationality, image):
    #     try:
    #         return Singer.objects.get(name=name, lastName=lastName, nationality=nationality, image=image)
    #     except Singer.DoesNotExist:
    #         return None
class AlbumQuery(graphene.ObjectType):
    album_by_name = graphene.Field(
        AlbumType, name=graphene.String(required=True))
    all_albums = graphene.List(
        AlbumType, first=graphene.Int(), skip=graphene.Int())
    def resolve_album_by_name(root, info, name):
        try:
            return Album.objects.get(name=name)
        except Album.DoesNotExist:
            return None
    def resolve_all_albums(root, info, first=None, skip=None):
        from django.contrib.auth.middleware import get_user
        from graphql_jwt.utils import get_payload, get_user_by_payload
        # context = info.context
        # print('info',dir(context))
        # user = info.context.user
        # print('IS AUTHENTICATED? ', user.is_authenticated)
        # if not user.is_authenticated:
        #     raise Exception("Authentication credentials were not provided")
        albums = Album.objects.all()
        if skip is not None:
            albums = albums[:skip]
        if first is not None:
            albums = albums[first:]
        return albums
class SongQuery(graphene.ObjectType):
    song_by_name = graphene.Field(
        SongType, name=graphene.String(required=True))
    all_songs = graphene.List(
        SingerType, first=graphene.Int(), skip=graphene.Int())
    def resolve_all_songs(root, info, first=None, skip=None):
        from django.contrib.auth.middleware import get_user
        from graphql_jwt.utils import get_payload, get_user_by_payload
        # context = info.context
        # print('info',dir(context))
        # user = info.context.user
        # print('IS AUTHENTICATED? ', user.is_authenticated)
        # if not user.is_authenticated:
        #     raise Exception("Authentication credentials were not provided")
        songs = Song.objects.all()
        if skip is not None:
            songs = songs[:skip]
        if first is not None:
            songs = songs[first:]
        return songs
    def resolve_song_by_name(root, info, name):
        try:
            return Song.objects.get(name=name)
        except Song.DoesNotExist:
            return None
class GenresInput(graphene.InputObjectType):
    id = graphene.ID()
    name = graphene.String(required=True)
class SingersInput(graphene.InputObjectType):
    id = graphene.ID()
    name = graphene.String(required=True)
    lastName = graphene.String()
    stageName = graphene.String()
    nationality = graphene.String()
    image = graphene.String()
class AlbumsInput(graphene.InputObjectType):
    id = graphene.ID()
    name = graphene.String(required=True)
    releaseDate = graphene.String()
    physicalPrice = graphene.Int()
    stock = graphene.Int()
    image = graphene.String()
    singer = graphene.Field(SingersInput)
    genre = graphene.Field(GenresInput)
class SongsInput(graphene.InputObjectType):
    id = graphene.ID()
    name = graphene.String(required=True)
    releaseDate = graphene.String()
    duration = graphene.Int()
    completeFile = graphene.String()
    previewFile = graphene.String()
    digitalPrice = graphene.Decimal()
    singer = graphene.Field(SingersInput)
    album = graphene.Field(AlbumsInput)

class UpsertGenreMutation(graphene.Mutation):
    class Arguments:
        # The input arguments for this mutation
        id = graphene.ID()
        name = graphene.String(required=True)
    # The class attributes define the response of the mutation
    genre = graphene.Field(GenreType)
    status = graphene.String()
    @classmethod
    def mutate(cls, root, info, name, id=None):
        genre = None
        if id is not None:
            try:
                genre = Genre.objects.get(pk=id)
                genre.name = name
                genre.save()
            except Genre.DoesNotExist:
                return cls(genre=None, status='Genre not found')
        else:
            genre = Genre.objects.create(name=name)
            genre.save()
        # Notice we return an instance of this mutation
        return UpsertGenreMutation(genre=genre)
class UpsertSingerMutation(graphene.Mutation):
    class Arguments:
        # The input arguments for this mutation
        id = graphene.ID()
        stageName = graphene.String(required=True)
        name = graphene.String(required=True)
        lastName = graphene.String(required=True)
        nationality = graphene.String(required=True)
        image = graphene.String(required=True)
    # The class attributes define the response of the mutation
    singer = graphene.Field(SingerType)
    status = graphene.String()
    @classmethod
    def mutate(cls, root, info, stageName, name, lastName, nationality, image, id=None):
        singer = None
        if id is not None:
            try:
                singer = Singer.objects.get(pk=id)
                singer.name = name
                singer.stageName = stageName
                singer.lastName = lastName
                singer.nationality = nationality
                singer.image = image
                singer.save()
            except Singer.DoesNotExist:
                return cls(singer=None, status='Singer not found')
        else:
            singer = Singer.objects.create(
                name=name, stageName=stageName, lastName=lastName, nationality=nationality, image=image)
            singer.save()
        # Notice we return an instance of this mutation
        return UpsertSingerMutation(singer=singer)

class UpsertAlbumMutation(graphene.Mutation):
    class Arguments:
        # The input arguments for this mutation
        id = graphene.ID()
        name = graphene.String(required=True)
        releaseDate = graphene.String()
        physicalPrice = graphene.Decimal(
            required=True, description='Physical price')
        stock = graphene.Int(required=True)
        image = graphene.String()
        singer = SingersInput(required=True)
        genre = GenresInput(required=True)
    # The class attributes define the response of the mutation
    album = graphene.Field(AlbumType)
    status = graphene.String()
    @classmethod
    def mutate(cls, root, info, **kwargs):
        print('info:', dir(info.context))
        print('headers:', info.context.headers)
        aux_singer = None
        if 'singer' in kwargs:
            singer = kwargs.pop('singer')
            if 'id' in singer:
                try:
                    aux_singer = Singer.objects.get(pk=singer['id'])
                    aux_singer.name = singer['name']
                    aux_singer.lastName = singer['lastName']
                    aux_singer.stageName = singer['stageName']
                    aux_singer.nationality = singer['nationality']
                    aux_singer.image = singer['image']
                    aux_singer.save()
                except Singer.DoesNotExist:
                    return cls(status='Singer not found', singer=None)
            else:
                aux_singer = Singer.objects.create(
                    name=singer['name'],
                    lastName=singer['lastName'],
                    stageName=singer['stageName'],
                    nationality=singer['nationality'],
                    image=singer['image']
                )
                aux_singer.save()
        aux_genre = None
        if 'genre' in kwargs:
            genre = kwargs.pop('genre')
            if 'id' in genre:
                try:
                    aux_genre = Genre.objects.get(pk=genre['id'])
                    aux_genre.name = genre['name']
                    aux_genre.save()
                except Genre.DoesNotExist:
                    return cls(status='Genre not found', genre=None)
            else:
                aux_genre = Genre.objects.create(name=genre['name'])
                aux_genre.save()
        if 'id' in kwargs:
            album = None
            try:
                album = Album.objects.get(pk=kwargs['id'])
                album.name = kwargs['name']
                album.physicalPrice = kwargs['physicalPrice']
                album.stock = kwargs['stock']
                album.genre = aux_genre
                album.singer = aux_singer
                if 'releaseDate' in kwargs:
                    album.releaseDate = datetime.strptime(kwargs['releaseDate'], "%Y-%m-%d")
                if 'image' in kwargs:
                    album.image = kwargs['image']
                album.save()
            except Album.DoesNotExist:
                return cls(album=None, status='Album not found')
        else:
            album = Album.objects.create(
                name = kwargs['name'], 
                physicalPrice = kwargs['physicalPrice'],
                stock = kwargs['stock'],
                genre = aux_genre,
                singer = aux_singer
                )
            if 'releaseDate' in kwargs:
                album.releaseDate = datetime.strptime(kwargs['releaseDate'], "%Y-%m-%d")
            if 'image' in kwargs:
                album.image = kwargs['image']
            album.save()
        # Notice we return an instance of this mutation
        return UpsertAlbumMutation(album=album, status='ok')

class UpsertSongMutation(graphene.Mutation):
    class Arguments:
        # The input arguments for this mutation
        id = graphene.ID()
        name = graphene.String(required=True)
        releaseDate = graphene.String()
        duration = graphene.Int(
            required=True, description='Duration of the Song')
        completeFile = graphene.String()
        previewFile = graphene.String()
        digitalPrice = graphene.Decimal(
            required=True, description='Average price')
        # singer = SingersInput(required=True)
        # album = AlbumsInput(required=True)
    # The class attributes define the response of the mutation
    song = graphene.Field(SongType)
    status = graphene.String()
    @classmethod
    def mutate(cls, root, info, **kwargs):
        print('info:', dir(info.context))
        print('headers:', info.context.headers)
        aux_singer = None
        if 'singer' in kwargs:
            singer = kwargs.pop('singer')
            if 'id' in singer:
                try:
                    aux_singer = Singer.objects.get(pk=singer['id'])
                    aux_singer.name = singer['name']
                    aux_singer.lastName = singer['lastName']
                    aux_singer.stageName = singer['stageName']
                    aux_singer.nationality = singer['nationality']
                    aux_singer.image = singer['image']
                    aux_singer.save()
                except Singer.DoesNotExist:
                    return cls(status='Singer not found', singer=None)
            else:
                aux_singer = Singer.objects.create(
                    name=singer['name'],
                    lastName=singer['lastName'],
                    stageName=singer['stageName'],
                    nationality=singer['nationality'],
                    image=singer['image']
                )
                aux_singer.save()
        aux_album = None
        if 'album' in kwargs:
            album = kwargs.pop('album')
            if 'id' in album:
                try:
                    aux_album = Album.objects.get(pk=album['id'])
                    aux_album.name = album['name']
                    aux_album.physicalPrice = album['physicalPrice']
                    aux_album.stock = album['stock']
                    if 'releaseDate' in album:
                        aux_album.releaseDate = datetime.strptime(album['releaseDate'], "%Y-%m-%d")
                    if 'image' in album:
                        aux_album.image = album['image']
                    if 'genre' in album:
                        aux_album.genre = album['genre']
                    aux_album.save()
                except Album.DoesNotExist:
                    return cls(status='Album not found', album=None)
            else:
                aux_album = Album.objects.create(name=album['name'], physicalPrice = album['physicalPrice'] , stock = album['stock'])
                if 'releaseDate' in album:
                    aux_album.releaseDate = datetime.strptime(album['releaseDate'], "%Y-%m-%d")
                aux_album.save()

        if 'id' in kwargs:
            song = None
            try:
                song = Song.objects.get(pk=kwargs['id'])
                song.name = kwargs['name']
                song.digitalPrice = kwargs['digitalPrice']
                song.completeFile = kwargs['completeFile']
                song.duration = kwargs['duration']
                song.previewFile = kwargs['previewFile']
                song.album = aux_album
                song.singer = aux_singer
                if 'releaseDate' in kwargs:
                    song.releaseDate = datetime.strptime(kwargs['releaseDate'], "%Y-%m-%d")
                song.save()
            except Song.DoesNotExist:
                return cls(song=None, status='Song not found')
        else:
            song = Song.objects.create(
                name = kwargs['name'], 
                digitalPrice = kwargs['digitalPrice'], 
                completeFile = kwargs['completeFile'], 
                duration = kwargs['duration'], 
                previewFile = kwargs['previewFile'],
                album = aux_album,
                singer = aux_singer
                )
            if 'releaseDate' in kwargs:
                song.releaseDate = datetime.strptime(kwargs['releaseDate'], "%Y-%m-%d") 
            song.save()
        # Notice we return an instance of this mutation
        return UpsertSongMutation(song=song, status='ok')
 
class DeleteGenreMutation(graphene.Mutation):
    ok = graphene.Boolean()
    class Arguments:
        id = graphene.ID()
    @classmethod
    def mutate(cls, root, info, **kwargs):
        genre = Genre.objects.get(pk=kwargs["id"])
        genre.delete()
        return cls(ok=True)
class DeleteSingerMutation(graphene.Mutation):
    ok = graphene.Boolean()
    class Arguments:
        id = graphene.ID()
    @classmethod
    def mutate(cls, root, info, **kwargs):
        singer = Singer.objects.get(pk=kwargs["id"])
        singer.delete()
        return cls(ok=True)
class DeleteAlbumMutation(graphene.Mutation):
    ok = graphene.Boolean()
    class Arguments:
        id = graphene.ID()
    @classmethod
    def mutate(cls, root, info, **kwargs):
        album = Album.objects.get(pk=kwargs["id"])
        album.delete()
        return cls(ok=True)
class DeleteSongMutation(graphene.Mutation):
    ok = graphene.Boolean()
    class Arguments:
        id = graphene.ID()
    @classmethod
    def mutate(cls, root, info, **kwargs):
        song = Song.objects.get(pk=kwargs["id"])
        song.delete()
        return cls(ok=True)
class SongMutation(graphene.ObjectType):
    pass
    upsert_genre = UpsertGenreMutation.Field()
    upsert_singer = UpsertSingerMutation.Field()
    upsert_album = UpsertAlbumMutation.Field()
    upsert_song = UpsertSongMutation.Field()
    delete_genre = DeleteGenreMutation.Field()
    delete_singer = DeleteSingerMutation.Field()
    delete_album = DeleteAlbumMutation.Field()
    delete_song = DeleteSongMutation.Field()
