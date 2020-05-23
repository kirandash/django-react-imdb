from rest_framework import serializers
from .models import Movie, Rating
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token


# serializer for converting movie model data into JSON
# we have to mention which model to serialize and what fields to include
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password')
        extra_kwargs = {'password': {'write_only': True, 'required': True}}

    # overwriting the create method to create user with validated data instead of plain data - so pwd is hashed
    def create(self, validated_data):
        # using built in create_user method for User object to create user with validated data
        user = User.objects.create_user(**validated_data)
        Token.objects.create(user=user)
        return user


class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = ('id', 'title', 'description', 'no_of_ratings', 'avg_rating')


class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = ('id', 'stars', 'user', 'movie')

