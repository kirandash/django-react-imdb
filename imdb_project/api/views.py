from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth.models import User
from .models import Movie, Rating
from .serializers import MovieSerializer, RatingSerializer, UserSerializer


# Create your views here.
# viewsets is to create REST endpoints where we can send data from serializers
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (AllowAny,)


class MovieViewSet(viewsets.ModelViewSet):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer
    authentication_classes = (TokenAuthentication,)
    # permission_classes = (AllowAny,)
    permission_classes = (IsAuthenticated,)

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
            stars = request.data['stars']
            user = request.user  # currently we have not implemented auth. So it will return anonymous
            # temporary hard coded user
            # user = User.objects.get(id=1)
            print('user', user)

            try:
                # if rating objects have same user and movie, update rating
                rating = Rating.objects.get(user=user.id, movie=movie.id)
                rating.stars = stars
                rating.save()
                # serialize rating object
                serializer = RatingSerializer(rating, many=False)
                response = {'message': 'Rating updated', 'result': serializer.data}
                return Response(response, status=status.HTTP_200_OK)
            except:
                # otherwise, create a new rating
                rating = Rating.objects.create(user=user, movie=movie, stars=stars)
                # serialize rating object
                serializer = RatingSerializer(rating, many=False)
                response = {'message': 'Rating created', 'result': serializer.data}
                return Response(response, status=status.HTTP_200_OK)

            # response JSON message
            # response = {'message': 'its working'}
            # return Response(response, status=status.HTTP_200_OK)
        # if not stars provided in request
        else:
            # response JSON message
            response = {'message': 'You need to provide stars'}
            return Response(response, status=status.HTTP_400_BAD_REQUEST)


class RatingViewSet(viewsets.ModelViewSet):
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    # overwriting update method to restrict update for rating - ModelViewSet ---> UpdateModelMixin ---> update method
    def update(self, request, *args, **kwargs):
        # response JSON message
        response = {'message': 'You cant update rating like that'}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)

    # overwriting update method to restrict create for rating - ModelViewSet ---> CreateModelMixin ---> create method
    def create(self, request, *args, **kwargs):
        # response JSON message
        response = {'message': 'You cant create rating like that'}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)

