# from itertools import count
# import pytest
# from library.sales.models import *
# from psycopg2.errors import *
# from django.db.utils import *

# #Verificar la insercion de nuevos articulos y que estén correctamente ligados INTEGRIDAD
# @pytest.mark.django_db
# @pytest.mark.parametrize(
#     "books_list, total",
#     [([
#         "Echo Park",
#         "El sol negro",
#         "El arca de Noe"
#     ],3), 
#     ([
#         "Tom Sawyer",
#         "Caballos",
#         "CHocolate",
#         "Tiburones"
#     ],4)]
# )
# def test_sale(books_list, total):
#     client = Client.objects.create(name="Dannae", last_name="Mar")
#     sale = Sale.objects.create(client = client)
#     for i in books_list:
#         book = Book.objects.create(name=i, publish_year= 2019, pages=25, price=360)
#         Article.objects.create(book=book, sale=sale, quantity = 1)

#     print('This is my sale: ',sale)
#     assert Article.objects.all().count() == total