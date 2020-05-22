from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Movie, Rating
from .serializers import MovieSerializer, RatingSerializer


# Create your views here.
# viewsets is to create REST endpoints where we can send data from serializers
class MovieViewSet(viewsets.ModelViewSet):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer

    # custom method rate_movie to be available at
    # By default ModelViewSet provides `create()`, `retrieve()`, `update()`,
    #     `partial_update()`, `destroy()` and `list()` actions. Cmd + click on ModelViewSet to see list
    # @action is used to decorate our custom method rate_movie
    #       detail True means the custom method can only be applied for detail view
    #       i.e a specific movie and not to list of movies
    #       method = POST means only POST method is allowed for rate_movie method
    @action(detail=True, methods=['POST'])
    # pk=None will use default pk which will be the id of movie
    def rate_movie(self, request, pk=None):
        # dummy JSON message
        response = {'message': 'its working'}
        return Response(response, status=status.HTTP_200_OK)


class RatingViewSet(viewsets.ModelViewSet):
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer

