from rest_framework import serializers
from .models import Movie, Rating


# serializer for converting movie model data into JSON
# we have to mention which model to serialize and what fields to include
class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = ('id', 'title', 'description')


class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = ('id', 'stars', 'user', 'movie')

