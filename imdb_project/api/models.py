from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MaxValueValidator, MinValueValidator


# Create your models here.
class Movie(models.Model):
    title = models.CharField(max_length=32)
    description = models.TextField(max_length=360)

    # custom fn to return total no of ratings for this movie
    def no_of_ratings(self):
        # select all ratings for this movie
        ratings = Rating.objects.filter(movie=self)
        return len(ratings)

    def avg_rating(self):
        total = 0
        ratings = Rating.objects.filter(movie=self)
        for rating in ratings:
            total += rating.stars
        if len(ratings) > 0:
            return total/len(ratings)
        else:
            return 0


class Rating(models.Model):
    # fields with references to other models
    # on_delete:models.CASCADE tells django that on deleting movie delete the rating as well
    # on_delete:models.CASCADE tells django that on deleting user delete the rating as well
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    # fields for rating model only
    # int field with min 1 and max 5
    stars = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])

    class Meta:
        # unique together and index_together is to limit only one rating per movie by a user.
        # django will accept a rating only if the collection of user and movie is unique.
        # So if user has rated for the movie before, django will not accept
        unique_together = (('user', 'movie'),)
        index_together = (('user', 'movie'),)
