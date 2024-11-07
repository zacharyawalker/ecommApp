from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . views import *
from django.http import HttpResponse

router = DefaultRouter()
router.register(r'', IdeaViewSet, basename="ideas")


urlpatterns = [
    path('', include(router.urls)),
]