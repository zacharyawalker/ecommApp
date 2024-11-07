from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . views import *

router = DefaultRouter()
router.register(r'categories', ProductCategoryViewSet, basename='categories')
router.register(r'', ProductsViewSet, basename='products')
#router.register(r'<int:pk>/mockups/', ProductsViewSet, basename='product-mockup-update')

urlpatterns = [
    path('', include(router.urls)),
]
