from django.urls import path
from .views import *


urlpatterns = [
    path('login/', CustomTokenObtainPairView.as_view(), name='custom_token_obtain_pair'),
    path('register/', UserRegistrationView.as_view(), name='register'),
    #path('auth/logout/', LogoutView.as_view(), name='logout'),
    path('logout/', LogoutView.as_view(), name='logout'),
]