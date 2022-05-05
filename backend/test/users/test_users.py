# import pytest
# #from django.contrib.auth.models import User
# from django.contrib.auth import get_user_model
# User = get_user_model()


# @pytest.mark.django_db
# def test_user_create():
# 	user = User.objects.create(username='test', email='test@test.com', type=User.Type.BUYER)
# 	count = User.objects.all().count()
# 	print(count)
# 	assert User.objects.count() == 1
# 	user.delete()

# @pytest.mark.django_db
# def test_no_user():
# 	count = User.objects.all().count()
# 	print(count)
# 	assert User.objects.count() == 0

# @pytest.fixture
# def user_1(db):
# 	return User.objects.create_user('test-user')

# @pytest.mark.django_db
# def test_set_check_password(user_1):
# 	user_1.set_password('new-password')
# 	print('this is my username', user_1)
# 	assert user_1.check_password('new-password') is True
# 	user_1.delete()

# def test_new_user(new_user):
# 	print(new_user.first_name)
# 	assert new_user.first_name == 'MyName'