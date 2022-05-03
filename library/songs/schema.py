from cmath import sin
import graphene
from graphene_django import DjangoObjectType
from graphene.types.field import Field
from library.songs.models import *

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
    all_genres = graphene.List(GenreType, name=graphene.String(required=True))
    
    def resolve_all_genres(root, info, **kwargs):
        # Querying a list
        return Genre.objects.all()

class SingerQuery(graphene.ObjectType):
    all_singers = graphene.List(SingerType, name=graphene.String(required=True))

    def resolve_all_singers(root, info, **kwargs):
        # Querying a list
        return Singer.objects.all()


class AlbumQuery(graphene.ObjectType):
    all_albums = graphene.List(AlbumType, name=graphene.String(required=True))
    album_by_singername = graphene.Field(AlbumType, name=graphene.String(required=True))
    album_by_songname = graphene.Field(AlbumType, name=graphene.String(required=True))

    def resolve_all_albums(root, info, **kwargs):
        # Querying a list
        return Album.objects.all()

    def resolve_album_by_singername(root, info, name):
        try:
            singer = Singer.objects.get(name=name)
            return singer.AlbumWithSinger.all()
        except Album.DoesNotExist:
            return None

    def resolve_album_by_songname(root, info, name):
        try:
            song = Song.objects.get(name=name)
            return song.SongWithAlbum.all()
        except Album.DoesNotExist:
            return None


class SongQuery(graphene.ObjectType):
    all_songs = graphene.List(SongType, name=graphene.String(required=True))
    song_by_albumname = graphene.Field(SongType, name=graphene.String(required=True))
    song_by_singername = graphene.Field(SongType, name=graphene.String(required=True))

    def resolve_all_songs(root, info, **kwargs):
        # Querying a list
        return Song.objects.all()

    def resolve_song_by_albumname(root, info, name):
        try:
            album = Album.objects.get(name=name)
            return album.SongWithAlbum.all()
        except Song.DoesNotExist:
            return None

    def resolve_song_by_singername(root, info, name):
        try:
            singer = Singer.objects.get(name=name)
            return singer.SongWithSinger.all()
        except Song.DoesNotExist:
            return None
    

class UpsertGenreMutation(graphene.Mutation):
    class Arguments:
        # The input arguments for this mutation
        id = graphene.ID()
        name = graphene.String(required=True)

    # The class attributes define the response of the mutation
    genre = graphene.Field(GenreType)

    @classmethod
    def mutate(cls, root, info, name, id = None):
        genre = None
        if id is not None:
            genre = Genre.objects.get(pk=id)
            genre.name = name
            genre.save()
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

    @classmethod
    def mutate(cls, root, info, stageName, name, lastName, nationality, image, id = None):
        singer = None
        if id is not None:
            singer = Singer.objects.get(pk=id)
            singer.name = name
            singer.stageName = stageName
            singer.lastName = lastName
            singer.nationality = nationality
            singer.image = image
            singer.save()
        else:
            singer = Singer.objects.create(name=name, stageName = stageName, lastName = lastName, nationality = nationality, image = image)
            singer.save()
        # Notice we return an instance of this mutation
        return UpsertSingerMutation(singer=singer)

class UpsertAlbumMutation(graphene.Mutation):
    class Arguments:
        # The input arguments for this mutation
        id = graphene.ID()
        name = graphene.String(required=True)
        singer = graphene.String(required=True)
        releaseDate = graphene.String()
        physicalPrice= graphene.String(required=True)
        genre = graphene.String(required=True)
        stock = graphene.String(required=True)
        image = graphene.String(required=True)
        

    # The class attributes define the response of the mutation
    album = graphene.Field(AlbumType)

    @classmethod
    def mutate(cls, root, info, name, singer, releaseDate, physicalPrice, genre, stock, image, id = None):
        album = None
        if id is not None:
            album = Album.objects.get(pk=id)
            album.name = name
            album.singer = singer
            album.releaseDate = releaseDate
            album.physicalPrice = physicalPrice
            album.genre = genre
            album.stock = stock
            album.image = image
            album.save()
        else:
            album = Album.objects.create(name=name, singer = singer, releaseDate = releaseDate, physicalPrice = physicalPrice, genre = genre, stock = stock, image = image)
            album.save()
        # Notice we return an instance of this mutation
        return UpsertAlbumMutation(album=album)

class UpsertSongMutation(graphene.Mutation):
    class Arguments:
        # The input arguments for this mutation
        id = graphene.ID()
        name = graphene.String(required=True)
        singer = graphene.String(required=True)
        releaseDate = graphene.String()
        album = graphene.String(required=True)
        duration = graphene.String(required=True)
        completeFile = graphene.String(required=True)
        previewFile = graphene.String(required=True)
        digitalPrice= graphene.String(required=True)

    # The class attributes define the response of the mutation
    song = graphene.Field(SongType)

    @classmethod
    def mutate(cls, root, info, name, singer, releaseDate, album, duration, completeFile, previewFile, digitalPrice, id = None):
        song = None
        if id is not None:
            song = Song.objects.get(pk=id)
            song.name = name
            song.singer = singer
            song.releaseDate = releaseDate
            song.album = album
            song.duration = duration
            song.completeFile = completeFile
            song.previewFile = previewFile
            song.digitalPrice = digitalPrice
            song.save()
        else:
            song = Song.objects.create(name=name, singer = singer, releaseDate = releaseDate, album = album, duration = duration, completeFile = completeFile, previewFile = previewFile, digitalPrice = digitalPrice)
            song.save()
        # Notice we return an instance of this mutation
        return UpsertSongMutation(song=song)



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


class Query(AlbumQuery, graphene.ObjectType):
    # query_genre = GenreQuery.Field()
    # query_singer = SingerQuery.Field()
    # query_album = AlbumQuery.Field()
    # query_song = SongQuery.Field()
    pass


class Mutation(graphene.ObjectType):
    pass
    upsert_genre = UpsertGenreMutation.Field()
    upsert_singer = UpsertSingerMutation.Field()
    upsert_album = UpsertAlbumMutation.Field()
    upsert_song = UpsertSongMutation.Field()
    delete_genre = DeleteGenreMutation.Field()
    delete_singer = DeleteSingerMutation.Field()
    delete_album = DeleteAlbumMutation.Field()
    delete_song = DeleteSongMutation.Field()
    #update_genre = GenreMutation.Field()

schema = graphene.Schema(query=Query, mutation=Mutation)