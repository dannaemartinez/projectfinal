from cmath import sin
from email.mime import image
from typing_extensions import Required
import graphene
from graphene_django import DjangoObjectType
from graphene.types.field import Field
from library.songs.schema import *
from library.sales.models import *
from library.users.schema import UsersInput

class SaleType(DjangoObjectType):
     class Meta:
         model = Sale
         fields = '__all__'

class DirectionType(DjangoObjectType):
     class Meta:
         model = Direction
         fields = '__all__'

class SaleQuery(graphene.ObjectType):
    sale_by_email = graphene.List(SaleType, clientUser=graphene.String(required=True))
    
    def resolve_sale_by_email(root, info, clientUser):
        try:
            return User.objects.filter(clientUser=clientUser)
        except User.DoesNotExist:
            return None

class SalesInput(graphene.InputObjectType):
    id = graphene.ID()
    clientUser = graphene.Field(UsersInput)
    buyDate = graphene.String()
    total = graphene.Int()


class CreateSaleMutation(graphene.Mutation):
    sale = graphene.List(SaleType)

    class Arguments:
        sale = SalesInput(required = True)

    @staticmethod
    def mutate (cls, root, info, **kwargs):
        print('info:',dir(info.context))
        print('headers:',info.context.headers)
        
        sale = Sale.objects.create(**kwargs)
        sale.save()
        return CreateSaleMutation(sale = sale)

class SaleMutation(graphene.ObjectType):
    pass
    upsert_sale = CreateSaleMutation.Field()
    