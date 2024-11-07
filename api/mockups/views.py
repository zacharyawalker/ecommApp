from rest_framework import viewsets
from .serializers import *
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status

class ProductCategoryViewSet(viewsets.ModelViewSet):
    queryset = MockupCategory.objects.all()
    serializer_class = ProductCategorySerializer

class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer

class MockupViewSet(viewsets.ModelViewSet):
    queryset = Mockup.objects.all()
    serializer_class = MockupSerializer

# class MockupLibraryViewSet(viewsets.ModelViewSet):
#     queryset = MockupLibrary.objects.all()

#     def get_serializer_class(self):
#         if self.action in ['create', 'update', 'partial_update']:
#             return MockupLibraryCreateSerializer
#         return MockupLibrarySerializer

class MockupLibraryViewSet(viewsets.ModelViewSet):
    queryset = MockupLibrary.objects.all()

    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update']:
            return MockupLibraryCreateSerializer
        return MockupLibrarySerializer

    # Custom action to add a mockup to the library
    @action(detail=True, methods=['post'])
    def add_mockup(self, request, pk=None):
        library = self.get_object()
        mockup_id = request.data.get('mockup_id')
        if not mockup_id:
            return Response({"detail": "Mockup ID is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            mockup = Mockup.objects.get(id=mockup_id)
            library.mockups.add(mockup)
            return Response({"detail": "Mockup added successfully"}, status=status.HTTP_200_OK)
        except Mockup.DoesNotExist:
            return Response({"detail": "Mockup not found"}, status=status.HTTP_404_NOT_FOUND)

    # Custom action to remove a mockup from the library
    @action(detail=True, methods=['post'])
    def remove_mockup(self, request, pk=None):
        library = self.get_object()
        mockup_id = request.data.get('mockup_id')
        if not mockup_id:
            return Response({"detail": "Mockup ID is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            mockup = Mockup.objects.get(id=mockup_id)
            library.mockups.remove(mockup)
            return Response({"detail": "Mockup removed successfully"}, status=status.HTTP_200_OK)
        except Mockup.DoesNotExist:
            return Response({"detail": "Mockup not found"}, status=status.HTTP_404_NOT_FOUND)
    
class ColorViewSet(viewsets.ModelViewSet):
    queryset = Color.objects.all()
    serializer_class = ColorSerializer