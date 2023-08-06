from django.db import models
from django.contrib.auth.models import User
from .models import *
# Create your models here.
class User_Data(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    profile_picture=models.ImageField(upload_to='profile_pics/', blank=True, null=True)

class Playlist(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE,default=1)
    name=models.TextField()
    image_url=models.TextField()
    audio_url=models.TextField()
