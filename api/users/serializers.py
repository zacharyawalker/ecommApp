from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken

class CustomTokenObtainPairSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, data):
        email = data.get("email")
        password = data.get("password")

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            raise serializers.ValidationError("Invalid email/password.")

        if not user.check_password(password):
            raise serializers.ValidationError("Invalid email/password.")

        # Generate the refresh token
        refresh = RefreshToken.for_user(user)

        # Access token is created using the refresh token
        access_token = str(refresh.access_token)  # Convert to string

        # Include user details in the response
        return {
            'id': str(user.id),
            'refresh': str(refresh),
            'access': access_token,  # Use access token here
            'email': user.email,
            'first_name': user.first_name,
            'last_name': user.last_name,
        }

class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'username', 'password', 'first_name', 'last_name']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User(
            email=validated_data['email'],
            username=validated_data['username'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
        )
        user.set_password(validated_data['password'])  # Hash the password
        user.save()
        return user