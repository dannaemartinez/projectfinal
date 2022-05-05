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
    
    def resolve_sale_by_email(root, info, email):
        try:
            return User.objects.filter(email=email)
        except Sale.DoesNotExist:
            return None

class SalesInput(graphene.InputObjectType):
    id = graphene.ID()
    email = graphene.Field(UsersInput)
    buyDate = graphene.String()
    total = graphene.Int()

class UpsertSaleMutation(graphene.Mutation):
    class Arguments:
        id = graphene.ID()
        user = UsersInput(required=True)
        buyDate = graphene.String()
        total = graphene.Int()
    
    sale = graphene.Field(SaleType)
    status = graphene.String()

    @classmethod
    def mutate (cls, root, info, **kwargs):
        print('info:', dir(info.context))
        print('headers:', info.context.headers)
        aux_user = None
        if 'user' in kwargs:
            user = kwargs.pop('user')
            if id in user:
                try:
                    aux_user = User.objects.get(pk=user['id'])
                    aux_user.email = user['email']
                    aux_user.username = user['username']
                    aux_user.password = user['password']
                    aux_user.mode = user['mode']
                    aux_user.save()
                except User.DoesNotExist:
                    return cls(status='User not found', user=None)
            else:
                aux_user = User.objects.create(
                    email = user['email'], username = user['username'],
                    password = user['password'], mode = user['mode']
                )
                aux_user.save()
        if 'id' in kwargs:
            sale = None
            try:
                sale = Sale.objects.get(pk=kwargs['id'])
                sale.total = kwargs['total']
                sale.user = aux_user
                if 'buyDate' in kwargs:
                    sale.releaseDate = datetime.strptime(kwargs['buyDate'], "%Y-%m-%d")
                sale.save()
            except Sale.DoesNotExist:
                return cls(sale = None, status='Sale not found')
        else:
            sale = Sale.objects.create(
                total = kwargs['total'], 
                sale = aux_user
            )
            if 'buyDate' in kwargs:
                    sale.releaseDate = datetime.strptime(kwargs['buyDate'], "%Y-%m-%d")
            sale.save()
        return UpsertSaleMutation(sale = sale)

class UpsertDierction(graphene.Mutation):
    class Arguments:
        id = graphene.ID()
        email = graphene.String(required=True)
        street = graphene.String(required=True)
        zipcode = graphene.Int(required=True)
        city = graphene.String(required=True)

    direction = graphene.Field(DirectionType)
    status = graphene.String()
    @classmethod
    def mutate(cls, root, info, **kwargs):
        print('info:', dir(info.context))
        print('headers:', info.context.headers)

        


class SaleMutation(graphene.ObjectType):
    pass
    upsert_sale = UpsertSaleMutation.Field()
    