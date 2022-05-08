from cmath import sin
from codecs import StreamWriter
import email
from email.mime import image
from typing_extensions import Required
import graphene
from graphene_django import DjangoObjectType
from graphene.types.field import Field
from library.songs.schema import *
from library.sales.models import *
from library.users.schema import UsersInput
from typing_extensions import Required
from sqlalchemy import desc
from graphene_django import DjangoObjectType
from django_filters import FilterSet, OrderingFilter

class SaleType(DjangoObjectType):
     class Meta:
         model = Sale
         fields = '__all__'

class DirectionType(DjangoObjectType):
     class Meta:
         model = Direction
         fields = '__all__'

class ItemSaleType(DjangoObjectType):
     class Meta:
         model = Item_Sale
         fields = '__all__'

class PlaylistType(DjangoObjectType):
     class Meta:
         model = Playlist
         fields = '__all__'

class PlaylistSongType(DjangoObjectType):
    class Meta:
        model = PlaylistSong
        fields = '__all__'
        ordering = ('song',)

class SaleQuery(graphene.ObjectType):
    sale_by_user = graphene.List(SaleType, user=graphene.String(required=True))
    
    def resolve_sale_by_user(root, info, user):
        try:
            return Sale.objects.filter(user=user)
        except Sale.DoesNotExist:
            return None

class DirectionQuery(graphene.ObjectType):
    direction_by_user = graphene.List(DirectionType, user=graphene.String(required=True))
    
    def resolve_direction_by_user(root, info, user, first = None, skip = None):
        from django.contrib.auth.middleware import get_user
        from graphql_jwt.utils import get_payload, get_user_by_payload
        
        context = info.context
        print('info',dir(context))
        user = info.context.user
        print('IS AUTHENTICATED? ', user.is_authenticated)
        
        if not user.is_authenticated:
            raise Exception("Authentication credentials were not provided")
        direction = Direction.objects.filter(user=user)
        if skip is not None:
            direction = direction[:skip]
        if first is not None:
            direction = direction[:first]
        return direction

class PlaylistQuery(graphene.ObjectType):
    playlist_by_user = graphene.List(PlaylistType, user=graphene.String(required=True))
    
    def resolve_playlist_by_user(root, info, user, first = None, skip = None):
        from django.contrib.auth.middleware import get_user
        from graphql_jwt.utils import get_payload, get_user_by_payload
        
        context = info.context
        print('info',dir(context))
        user = info.context.user
        print('IS AUTHENTICATED? ', user.is_authenticated)
        
        if not user.is_authenticated:
            raise Exception("Authentication credentials were not provided")
        playlist = Playlist.objects.filter(user=user)
        if skip is not None:
            playlist = playlist[:skip]
        if first is not None:
            playlist = playlist[:first]
        return playlist

class PlaylistSongQuery(graphene.ObjectType):
    playlist_by_song_desc = graphene.List(PlaylistSongType, song=graphene.String(required=True))
    playlist_by_song_asc = graphene.List(PlaylistSongType, song=graphene.String(required=True))

    def resolve_playlist_by_song_desc(root, info, song, first = None, skip = None):
        from django.contrib.auth.middleware import get_user
        from graphql_jwt.utils import get_payload, get_user_by_payload
        
        context = info.context
        print('info',dir(context))
        user = info.context.user
        print('IS AUTHENTICATED? ', user.is_authenticated)
        
        if not user.is_authenticated:
            raise Exception("Authentication credentials were not provided")
        playlistSong = PlaylistSong.objects.filter(song=song).order_by('-song')
        if skip is not None:
            playlistSong = playlistSong[:skip]
        if first is not None:
            playlistSong = playlistSong[:first]
        return playlistSong
    
    def resolve_playlist_by_song_asc(root, info, song, first = None, skip = None):
        from django.contrib.auth.middleware import get_user
        from graphql_jwt.utils import get_payload, get_user_by_payload
        
        context = info.context
        print('info',dir(context))
        user = info.context.user
        print('IS AUTHENTICATED? ', user.is_authenticated)
        
        if not user.is_authenticated:
            raise Exception("Authentication credentials were not provided")
        playlistSong = PlaylistSong.objects.filter(song=song).order_by('song')
        if skip is not None:
            playlistSong = playlistSong[:skip]
        if first is not None:
            playlistSong = playlistSong[:first]
        return playlistSong

class SalesInput(graphene.InputObjectType):
    id = graphene.ID()
    user = graphene.Field(UsersInput)
    buyDate = graphene.String()
    total = graphene.Int()
                              
class ItemSalesInput(graphene.InputObjectType):
    id = graphene.ID()
    songs = graphene.Field(SongsInput)
    albums = graphene.Field(AlbumsInput)
    ales = graphene.Field(SalesInput)
    finalPrice = graphene.Int()

class DirectionInput(graphene.InputObjectType):
    id = graphene.ID()
    user = graphene.Field(UsersInput)
    street = graphene.String()
    zipcode = graphene.Int()
    city = graphene.String()

class PlaylistInput(graphene.InputObjectType):
    id = graphene.ID()
    user = graphene.Field(UsersInput)
    name = graphene.String()

class UpsertSaleMutation(graphene.Mutation):
    class Arguments:
        id = graphene.ID()
        userId = graphene.Int(required=True)
        buyDate = graphene.String()
        total = graphene.Decimal()
    
    sale = graphene.Field(SaleType)
    status = graphene.String()

    @classmethod
    def mutate (cls, root, info, **kwargs):
        print('info:', dir(info.context))
        print('headers:', info.context.headers)
        if 'id' in kwargs:
            sale = None
            try:
                sale = Sale.objects.get(pk=kwargs['id'])
                sale.total = kwargs['total']
                sale.user = User.objects.get(pk=kwargs['userId'])
                if 'buyDate' in kwargs:
                    sale.buyDate = datetime.strptime(kwargs['buyDate'], "%Y-%m-%d")
                sale.save()
            except Sale.DoesNotExist:
                return cls(sale = None, status='Sale not found')
        else:
            user = User.objects.get(pk=kwargs['userId'])
            sale = Sale.objects.create(
                total = kwargs['total'], 
                user = user
            )
            if 'buyDate' in kwargs:
                    sale.releaseDate = datetime.strptime(kwargs['buyDate'], "%Y-%m-%d")
            sale.save()
        return UpsertSaleMutation(sale = sale)

class UpsertDirectionMutation(graphene.Mutation):
    class Arguments:
        id = graphene.ID()
        userId = graphene.Int(required=True)
        street = graphene.String(required=True)
        zipcode = graphene.Int(required=True)
        city = graphene.String(required=True)

    direction = graphene.Field(DirectionType)
    status = graphene.String()
    @classmethod
    def mutate(cls, root, info, **kwargs):
        print('info:', dir(info.context))
        print('headers:', info.context.headers)
        if 'id' in kwargs:
            direction = None
            try:
                direction = Direction.objects.get(pk=kwargs['id'])
                direction.street = kwargs['street']
                direction.zipcode = kwargs['zipcode']
                direction.city = kwargs['city']
                direction.user = User.objects.get(pk=kwargs['userId'])
                direction.save()
            except Direction.DoesNotExist:
                return cls(direction = None, status='direction not found')
        else:
            user = User.objects.get(pk=kwargs['userId'])
            direction = Direction.objects.create(
                street = kwargs['street'], 
                zipcode = kwargs['zipcode'],
                city = kwargs['city'],
                user = user
            )
            direction.save()
        return UpsertDirectionMutation(direction = direction)
        
class UpsertItemSaleMutation(graphene.Mutation):
    class Arguments:
        id = graphene.ID()
        albumId = graphene.Int(required=True)
        songId = graphene.Int(required=True)
        saleId = graphene.Int(required=True)
        finalPrice = graphene.Decimal()
    
    itemsale = graphene.Field(ItemSaleType)
    status = graphene.String()

    @classmethod
    def mutate (cls, root, info, **kwargs):
        print('info:', dir(info.context))
        print('headers:', info.context.headers)
        if 'id' in kwargs:
            itemsale = None
            try:
                itemsale = Item_Sale.objects.get(pk=kwargs['id'])
                itemsale.finalPrice = kwargs['finalPrice']
                itemsale.album = Album.objects.get(pk=kwargs['albumId'])
                itemsale.song = Song.objects.get(pk=kwargs['songId'])
                itemsale.sale = Sale.objects.get(pk=kwargs['saleId'])
                itemsale.save()
            except Item_Sale.DoesNotExist:
                return cls(itemsale = None, status='ItemSale not found')
        else:
            album = Album.objects.get(pk=kwargs['albumId'])
            song = Song.objects.get(pk=kwargs['songId'])
            sale = Sale.objects.get(pk=kwargs['saleId'])
            itemsale = Item_Sale.objects.create(
                finalPrice = kwargs['finalPrice'], 
                songs = song,
                albums = album,
                sale = sale
            )
            itemsale.save()
        return UpsertItemSaleMutation(itemsale = itemsale)

class UpsertPlaylistMutation(graphene.Mutation):
    class Arguments:
        id = graphene.ID()
        userId = graphene.Int(required=True)
        name = graphene.String()

    playlist = graphene.Field(PlaylistType)
    status = graphene.String()

    @classmethod
    def mutate (cls, root, info, **kwargs):
        print('info:', dir(info.context))
        print('headers:', info.context.headers)
        if 'id' in kwargs:
            playlist = None
            try:
                playlist = Playlist.objects.get(pk=kwargs['id'])
                playlist.user = User.objects.get(pk=kwargs['userId'])
                playlist.name = kwargs['name']
                playlist.save()
            except Playlist.DoesNotExist:
                return cls(playlist = None, status='Playlist not found')
        else:
            user = User.objects.get(pk=kwargs['userId'])
            playlist = Playlist.objects.create(
                name = kwargs['name'], 
                user = user
            )
            playlist.save()
        return UpsertPlaylistMutation(playlist = playlist)

class UpsertPlaylistSongMutation(graphene.Mutation):
    class Arguments:
        id = graphene.ID()
        songId = graphene.Int(required=True)
        playlistId = graphene.Int(required=True)

    playlistSong = graphene.Field(PlaylistSongType)
    status = graphene.String()

    @classmethod
    def mutate (cls, root, info, **kwargs):
        print('info:', dir(info.context))
        print('headers:', info.context.headers)
        if 'id' in kwargs:
            playlistSong = None
            try:
                playlistSong = Playlist.objects.get(pk=kwargs['id'])
                playlistSong.playlist = Playlist.objects.get(pk=kwargs['playlistid'])
                playlistSong.song = Song.objects.get(pk=kwargs['songId'])
                playlistSong.save()
            except PlaylistSong.DoesNotExist:
                return cls(playlistSong = None, status='PlaylistSong not found')
        else:
            playlist = Playlist.objects.get(pk=kwargs['playlistId'])
            song = Song.objects.get(pk=kwargs['songId'])
            playlistSong = PlaylistSong.objects.create(
                playlist = playlist,
                song = song
            )
            playlistSong.save()
        return UpsertPlaylistSongMutation(playlistSong = playlistSong)

class SaleMutation(graphene.ObjectType):
    pass
    upsert_sale = UpsertSaleMutation.Field()
    upsert_direction = UpsertDirectionMutation.Field()
    upsert_itemsale = UpsertItemSaleMutation.Field()
    upsert_playlist = UpsertPlaylistMutation.Field()
    upsert_playlistSong = UpsertPlaylistSongMutation.Field()
                  