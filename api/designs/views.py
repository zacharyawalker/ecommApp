from rest_framework import viewsets
from .serializers import *

class DesignsViewSet(viewsets.ModelViewSet):
    queryset = Design.objects.all()
    serializer_class = DesignsSerializer

    # def get_serializer_class(self):
    #     if self.action in ['create', 'update', 'partial_update']:
    #         return DesignsCreateUpdateSerializer
    #     return DesignsSerializer
