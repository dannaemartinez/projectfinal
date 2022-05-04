from datetime import date
import email
import graphene
from graphene_django import DjangoObjectType
from graphene.types.field import Field
from library.users.models import *
from library.songs.models import *
from library.sales.models import *

class SaleType(DjangoObjectType):
     class Meta:
         model = Sale
         fields = '__all__'

class DirectionType(DjangoObjectType):
     class Meta:
         model = Direction
         fields = '__all__'

class SaleQuery(graphene.ObjectType):
    sale_by_email = graphene.List(SaleType, email=graphene.String(required=True))
    
    def resolve_genre_by_email(root, info, email):
        try:
            return User.objects.filter(email=email)
        except User.DoesNotExist:
            return None

class SalesInput(graphene.InputObjectType):
    id = graphene.ID()
    email = graphene.String(required=True) 
    date = graphene.String()
    total = graphene.Int()

class DeleteSaleMutation(graphene.Mutation):
    ok = graphene.Boolean()

    class Arguments:
        id = graphene.ID()

    @classmethod
    def mutate(cls, root, info, **kwargs):
        sale = Sale.objects.get(pk=kwargs["id"])
        sale.delete()
        return cls(ok=True)


class SaleMutation(graphene.ObjectType):
    pass
    #upsert_sale = UpsertSaleMutation.Field()
    delete_sale = DeleteSaleMutation.Field()