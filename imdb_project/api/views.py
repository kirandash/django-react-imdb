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
        # if stars provided in request
        if 'stars' in request.data:
            # print id of movie
            print('movie id', pk)
            # get specific movie object from Movie model using movie id
            movie = Movie.objects.get(id=pk)
            print('movie title', movie.title)
            # response JSON message
            response = {'message': 'its working'}
            return Response(response, status=status.HTTP_200_OK)
        # if not stars provided in request
        else:
            # response JSON message
            response = {'message': 'You need to provide stars'}
            return Response(response, status=status.HTTP_400_BAD_REQUEST)


class RatingViewSet(viewsets.ModelViewSet):
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer

