from library.songs.schema import GenreQuery, AlbumQuery, SingerQuery, SongQuery, SongMutation
from library.users.schema import UserQuery, UserMutation
import graphene
from graphene.types.field import Field
from typing_extensions import Required
import graphql_jwt
from library.users.models import *
from library.sales.schema import PlaylistQuery, PlaylistSongQuery, SaleMutation, SaleQuery, DirectionQuery, UpsertDirectionMutation, UpsertSaleMutation, PlaylistSong, UpsertPlaylistSongMutation, PlaylistSongType
import graphql_jwt

class Query(GenreQuery, AlbumQuery, SingerQuery, SongQuery, UserQuery, SaleQuery, DirectionQuery, PlaylistQuery, PlaylistSongQuery, graphene.ObjectType):
    pass

class Mutation(SongMutation, UserMutation, SaleMutation, graphene.ObjectType):

	# JWT MUTATIONS
	token_auth = graphql_jwt.ObtainJSONWebToken.Field()
	verify_token = graphql_jwt.Verify.Field()
	refresh_token = graphql_jwt.Refresh.Field()
	revoke_token = graphql_jwt.Revoke.Field()
	delete_token_cookie = graphql_jwt.DeleteJSONWebTokenCookie.Field()
	delete_refresh_token_cookie = graphql_jwt.DeleteRefreshTokenCookie.Field()

schema = graphene.Schema(query=Query, mutation=Mutation)