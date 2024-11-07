from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . views import *
from django.http import HttpResponse

router = DefaultRouter()
router.register(r'color', ColorViewSet, basename="mockup_colors")
router.register(r'library', MockupLibraryViewSet, basename="mockup_libraries")
router.register(r'categories', ProductCategoryViewSet, basename='product_categories')
router.register(r'tags', TagViewSet, basename='tags')
router.register(r'', MockupViewSet, basename='mockups')


urlpatterns = [
    path('', include(router.urls)),
]