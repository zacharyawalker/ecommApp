from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . views import *

router = DefaultRouter()
router.register(r'categories', ProductCategoryViewSet, basename='categories')
router.register(r'', ProductsViewSet, basename='products')
#router.register(r'<int:pk>/mockups/', ProductsViewSet, basename='product-mockup-update')

urlpatterns = [
    path('', include(router.urls)),
    path('<int:product_id>/download_mockups/', download_all_mockups, name='download_mockups'),
    path('libraries/<int:library_id>/download_mockups/', download_library_mockups, name='download_library_mockups'),
]

