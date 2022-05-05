from cmath import sin
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
    all_genres = graphene.List(GenreType, first=graphene.Int(), skip=graphene.Int())
    genres_by_name = graphene.List(GenreType, name=graphene.String(required=True)) ############################################
    
    def resolve_all_genres(root, info, first = None, skip = None):
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
            return Genre.objects.filter(name=name) ###############################
        except Genre.DoesNotExist:
            return None

class SingerQuery(graphene.ObjectType):
    all_singers = graphene.List(SingerType, first=graphene.Int(), skip=graphene.Int())
    singer_by_name = graphene.List(SingerType, name=graphene.String(required=True))

    def resolve_all_singers(root, info, first = None, skip = None):
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
    album_by_name = graphene.Field(AlbumType, name=graphene.String(required=True))
    all_albums = graphene.List(AlbumType, first=graphene.Int(), skip=graphene.Int())

    def resolve_album_by_name(root, info, name):
        try:
            return Album.objects.get(name=name)
        except Album.DoesNotExist:
            return None

    def resolve_all_albums(root, info, first = None, skip = None):
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
    song_by_name = graphene.Field(SongType, name=graphene.String(required=True))
    all_songs = graphene.List(SingerType, first=graphene.Int(), skip=graphene.Int())

    def resolve_all_songs(root, info, first = None, skip = None):
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
    duration = graphene.String()
    completeFile = graphene.String()
    previewFile = graphene.String()
    digitalPrice = graphene.Int()
    #si se pone
    singer = graphene.Field(SingersInput)
    albums = graphene.Field(AlbumsInput)

class UpsertGenreMutation(graphene.Mutation):
    class Arguments:
        # The input arguments for this mutation
        id = graphene.ID()
        name = graphene.String(required=True)

    # The class attributes define the response of the mutation
    genre = graphene.Field(GenreType)
    status = graphene.String()

    @classmethod
    def mutate(cls, root, info, name, id = None):
        genre = None
        if id is not None:
            try:
                genre = Genre.objects.get(pk=id)
                genre.name = name
                genre.save()
            except Genre.DoesNotExist:
                    return cls( genre = None, status = 'Genre not found')
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
    def mutate(cls, root, info, stageName, name, lastName, nationality, image, id = None):
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
                    return cls( book = None, status = 'Singer not found')
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
        releaseDate = graphene.String()
        physicalPrice = graphene.Int(required=True, description='Duration of the Song')
        stock = graphene.Int()
        image = graphene.String()
        singers = graphene.List(SingersInput)
        genres = graphene.List(GenresInput)

    # The class attributes define the response of the mutation
    album = graphene.Field(AlbumType)
    status = graphene.String()

    @classmethod
    def mutate(cls, root, info, **kwargs):

        print('info:',dir(info.context))
        print('headers:',info.context.headers)
        
        l_singers = []
        if 'singers' in kwargs:
            singers =  kwargs.pop('singers')
            for singer in singers:
                aux = None
                if 'id' in singer:
                    try:
                        aux = Singer.objects.get(pk=singer['id'])
                        aux.name = singer['name']
                        aux.lastName = singer['lastName']
                        aux.nationality = singer['nationality']
                        aux.image = singer['image']
                        aux.save()
                    except Singer.DoesNotExist:
                        return cls( status = 'Singer not found', singer = None)
                else:
                    aux = Singer.objects.create(**kwargs)
                    aux.save()
                l_singers.append(aux)


        l_genres = []
        if 'genres' in kwargs:
            genres =  kwargs.pop('genres')
            for genre in genres:
                aux = None
                if 'id' in genre:
                    try:
                        aux = Genre.objects.get(pk=genre['id'])
                        aux.name = genre['name']
                        aux.save()
                    except Genre.DoesNotExist:
                        return cls( status = 'Genre not found', genre = None)
                else:
                    aux = Genre.objects.create(name=genre['name'])
                    aux.save()
                l_genres.append(aux)


        if 'id' in kwargs:
            album = None
            try:
                album = Album.objects.get(pk=kwargs['id'])
                album.name = kwargs['name']
                album.physicalPrice = kwargs['physicalPrice']
                album.stock = kwargs['stock']
                if 'releaseDate' in kwargs:
                    album.releaseDate = kwargs['releaseDate']
                album.save()
            except Album.DoesNotExist:
                return cls( album = None, status = 'Album not found')
        else:
            album = Album.objects.create(**kwargs)
            album.save()
            for singer in l_singers:
                albums_singers = Album.objects.create(album=album, singer=singer) #hace ruido
                albums_singers.save()
            for genre in l_genres:
                albums_genres = Album.objects.create(album=album, genre=genre) #hace ruido
                albums_genres.save()
        # Notice we return an instance of this mutation
        return UpsertAlbumMutation(album = album, status = 'ok')

# class UpsertAlbumMutation(graphene.Mutation):
#     class Arguments:
#         # The input arguments for this mutation
#         id = graphene.ID()
#         name = graphene.String(required=True)
#         singer = graphene.String(required=True)
#         releaseDate = graphene.String()
#         physicalPrice= graphene.String(required=True)
#         genre = graphene.String(required=True)
#         stock = graphene.String(required=True)
#         image = graphene.String(required=True)
        

#     # The class attributes define the response of the mutation
#     album = graphene.Field(AlbumType)

#     @classmethod
#     def mutate(cls, root, info, name, singer, releaseDate, physicalPrice, genre, stock, image, id = None):
#         album = None
#         if id is not None:
#             album = Album.objects.get(pk=id)
#             album.name = name
#             album.singer = singer
#             album.releaseDate = releaseDate
#             album.physicalPrice = physicalPrice
#             album.genre = genre
#             album.stock = stock
#             album.image = image
#             album.save()
#         else:
#             album = Album.objects.create(name=name, singer = singer, releaseDate = releaseDate, physicalPrice = physicalPrice, genre = genre, stock = stock, image = image)
#             album.save()
#         # Notice we return an instance of this mutation
#         return UpsertAlbumMutation(album=album)

class UpsertSongMutation(graphene.Mutation):
    class Arguments:
        # The input arguments for this mutation
        id = graphene.ID()
        name = graphene.String(required=True)
        releaseDate = graphene.String()
        duration = graphene.Int(required=True, description='Duration of the Song')
        completeFile = graphene.String()
        previewFile = graphene.String()
        digitalPrice = graphene.Decimal(required=True, description='Average price')
        singers = graphene.List(SingersInput)
        albums = graphene.List(AlbumsInput)

    # The class attributes define the response of the mutation
    song = graphene.Field(SongType)
    status = graphene.String()

    @classmethod
    def mutate(cls, root, info, **kwargs):

        print('info:',dir(info.context))
        print('headers:',info.context.headers)
        
        l_singers = []
        if 'singers' in kwargs:
            singers =  kwargs.pop('singers')
            for singer in singers:
                aux = None
                if 'id' in singer:
                    try:
                        aux = Singer.objects.get(pk=singer['id'])
                        aux.name = singer['name']
                        aux.lastName = singer['lastName']
                        aux.nationality = singer['nationality']
                        if 'image' in kwargs:
                            album.image = kwargs['image']
                        if 'stageName' in kwargs:
                            album.stageName = kwargs['stageName']
                        aux.save()
                    except Singer.DoesNotExist:
                        return cls( status = 'Singer not found', song = None)
                else:
                    aux = Singer.objects.create(name=singer['name'], lastName=singer['lastName'], nationality=singer['nationality'], image=singer['image'])
                    aux.save()
                l_singers.append(aux)

        l_albums = []
        if 'albums' in kwargs:
            albums =  kwargs.pop('albums')
            for album in albums:
                aux = None
                if 'id' in album:
                    try:
                        aux = Album.objects.get(pk=album['id'])
                        aux.name = album['name']
                        # aux.image = album['image']
                        if 'releaseDate' in kwargs:
                            album.releaseDate = kwargs['releaseDate']
                        if 'physicalPrice' in kwargs:
                            album.physicalPrice = kwargs['physicalPrice']
                        if 'stock' in kwargs:
                            album.stock = kwargs['stock']
                        if 'image' in kwargs:
                            album.image = kwargs['image']
                        
                        aux.save()
                    except Album.DoesNotExist:
                        return cls( status = 'Album not found', album = None)
                else:
                    aux = Album.objects.create(name=album['name'], releaseDate=album['releaseDate'], physicalPrice=album['physicalPrice'], stock=album['stock'], image=album['image'])
                    aux.save()
                l_albums.append(aux)

        if 'id' in kwargs:
            song = None
            try:
                song = Song.objects.get(pk=kwargs['id'])
                song.name = kwargs['name']
                song.digitalPrice = kwargs['digitalPrice']
                if 'releaseDate' in kwargs:
                    song.releaseDate = kwargs['releaseDate']
                if 'duration' in kwargs:
                    song.duration = kwargs['duration']
                if 'completeFile' in kwargs:
                    song.completeFile = kwargs['completeFile']
                if 'previewFile' in kwargs:
                    song.previewFile = kwargs['previewFile']
                song.save()
            except Song.DoesNotExist:
                    return cls( song = None, status = 'Song not found')
        
        else:
            song = Song.objects.create(**kwargs)
            song.save()
            for singer in l_singers:
                songs_singers = Song.objects.create(song=song, singer=singer) #hace ruido
                songs_singers.save()
            for album in l_albums:
                songs_albums = Album.objects.create(song=song, album=album) #hace ruido
                songs_albums.save()
        # Notice we return an instance of this mutation
        return UpsertSongMutation(song = song, status = 'ok')

 #class UpsertSongMutation(graphene.Mutation):
    # class Arguments:
    #     # The input arguments for this mutation
    #     id = graphene.ID()
    #     name = graphene.String(required=True)
    #     singer = graphene.String(required=True)
    #     releaseDate = graphene.String()
    #     album = graphene.String(required=True)
    #     duration = graphene.String(required=True)
    #     completeFile = graphene.String(required=True)
    #     previewFile = graphene.String(required=True)
    #     digitalPrice= graphene.String(required=True)

    # # The class attributes define the response of the mutation
    # song = graphene.Field(SongType)

    # @classmethod
    # def mutate(cls, root, info, name, singer, releaseDate, album, duration, completeFile, previewFile, digitalPrice, id = None):
    #     song = None
    #     if id is not None:
    #         song = Song.objects.get(pk=id)
    #         song.name = name
    #         song.singer = singer
    #         song.releaseDate = releaseDate
    #         song.album = album
    #         song.duration = duration
    #         song.completeFile = completeFile
    #         song.previewFile = previewFile
    #         song.digitalPrice = digitalPrice
    #         song.save()
    #     else:
    #         song = Song.objects.create(name=name, singer = singer, releaseDate = releaseDate, album = album, duration = duration, completeFile = completeFile, previewFile = previewFile, digitalPrice = digitalPrice)
    #         song.save()
    #     # Notice we return an instance of this mutation
    #     return UpsertSongMutation(song=song)

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


# class Query(GenreQuery, AlbumQuery, SingerQuery, SongQuery, graphene.ObjectType):
#     pass


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
    #JWT MUTATIONS
#     token_auth = graphql_jwt.ObtainJSONWebToken.Field()
#     verify_token = graphql_jwt.Verify.Field()
#     refresh_token = graphql_jwt.Refresh.Field()

# schema = graphene.Schema(query=Query, mutation=Mutation)