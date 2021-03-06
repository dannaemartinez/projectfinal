
from django.contrib import admin
#from django.urls import path, include
# Swagger changes
from django.urls import path, include, re_path
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from graphene_django.views import GraphQLView
from django.views.decorators.csrf import csrf_exempt
from graphql_jwt.decorators import jwt_cookie

#GRAPH URLS
urlpatterns = [
    # ...
    path('graphiql', jwt_cookie(csrf_exempt(GraphQLView.as_view(graphiql=True)))),
    path('graphql', jwt_cookie(csrf_exempt(GraphQLView.as_view(graphiql=False)))),

]
#from library.views import CustomTokenObtainPairView

# JWT URLs
urlpatterns += [
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
] 

#luego le pongo api, ya que se necesitar√° en el proyecto
urlpatterns += [
    path('admin/', admin.site.urls),
    path('api_auth/', include('rest_framework.urls')),
    path('users/', include('library.users.urls')),
    path('songs/', include('library.songs.urls')),
    path('sales/', include('library.sales.urls')),
]

# Swagger URLs
schema_view = get_schema_view(
   openapi.Info(
      title="Snippets API",
      default_version='v1',
      description="Test description",
      terms_of_service="https://www.google.com/policies/terms/",
      contact=openapi.Contact(email="contact@snippets.local"),
      license=openapi.License(name="BSD License"),
   ),
   public=True,
)
urlpatterns += [
   re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
   re_path(r'^swagger/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
   re_path(r'^redoc/$', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]