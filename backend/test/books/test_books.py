# import pytest
# from library.books.models import *

# @pytest.mark.django_db
# @pytest.mark.parametrize(
#   'nombre, apellido',
#   (
#     ('Paulo','Coelho'),
#     ('Haruki','Murakami'),
#     ('Rey','Julien')
#   )
# )
# def test_author_name(nombre,apellido):
#   author = Author.objects.create(name=nombre, last_name=apellido)
#   print('This is my authors name: ',author.name)
#   assert author.last_name == apellido
#   assert Author.objects.all().count() == 1
#   author.delete()
#   assert Author.objects.all().count() == 0

# @pytest.mark.django_db
# @pytest.mark.parametrize(
#     'name, publish_year, pages, price',
#   (
#     ('Mariposas',2020, 50, 268),
#     ('Delfines',2019, 26, 100),
#     ('Orcas',2011, 36, 128.5)
#   )
# )
# def test_price_book(name, publish_year, pages, price):
#     book = Book.objects.create(name=name, publish_year=publish_year, pages=pages, price=price)
#     print(book.name)
#     assert book.price > 0

# @pytest.mark.django_db
# @pytest.mark.parametrize(
#     'name, publish_year, pages, price',
#   (
#     ('Mariposas',2020, 50, 268),
#     ('Delfines',2019, 26, 100),
#     ('Orcas',2011, 36, 128.5)
#   )
# )
# def test_dates_book(name, publish_year, pages, price):
#     book = Book.objects.create(name=name, publish_year=publish_year, pages=pages, price=price)
#     print(book.name)
#     assert book.created_at <= book.updated_at

# # @pytest.mark.django_db
# # def test_author_with_monkey(monkeypatch):
# # 	autor = Author.objects.create(name='Nombre', last_name='Apellido')

# # 	class AuthorQuerysetMock():
# # 		def _init_(self):
# # 			self.some_value = 1

# # 		def count(self):
# # 			return 4

# # 	def model_count_mock():
# # 		return AuthorQuerysetMock()

# # 	monkeypatch.setattr(Author.objects, 'count', model_count_mock)

# # 	assert Author.objects.all().count() == 4
# # 	print('Haciendo el monkeypatch')

