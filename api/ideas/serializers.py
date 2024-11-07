from rest_framework import serializers
from .models import *

class IdeaSerializer(serializers.ModelSerializer):

    class Meta:
        model = Idea
        fields = "__all__"