from django.shortcuts import render,redirect
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from django.contrib.auth import get_user_model
from Front.models import *
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials

client_id = '4a2aad46dcbf4a009e5c2c1b257d3633'
client_secret = '41aa9078a14343fda84d7703760ae0a7'
spotify = spotipy.Spotify(client_credentials_manager=SpotifyClientCredentials(client_id=client_id, client_secret=client_secret))

playlists=['https://open.spotify.com/playlist/5muSk2zfQ3LI70S64jbrX7?si=20ed5a1e2b1d4fce',
          'https://open.spotify.com/playlist/6JqNCjBO2sEuEDxqempzRm?si=3bee25c8d7c3404d',
          'https://open.spotify.com/playlist/335x6l1z0DbD1pgysYkkD8?si=cb1648b9c8b848da',
          'https://open.spotify.com/playlist/6ppm1rd8zW1FfkWkLOJd80?si=c32c4bb21fdc4fcb']

Best_Songs='https://open.spotify.com/playlist/5muSk2zfQ3LI70S64jbrX7?si=e0357c01b78041c9'

languages=['English','Hindi','Telugu','Kannada']

# Create your views here.
def homepage(request):
    if request.method=='POST':
        email=request.POST.get('email')
        password=request.POST.get('password')
        user = authenticate(request, username=email, password=password)
        if user is not None:
            login(request, user)
            user_id = user.id
            user_details = User_Data.objects.get(user=user)
            #return render(request, 'main.html', {'user_id': user_id, 'details': user_details})
            return redirect('signin', user_id=user_id)
        else:
            return render(request, 'home.html')

    return render(request,'home.html')

def signup(request):
    if request.method =='POST':
        first_name=request.POST.get('first_name')
        last_name=request.POST.get('last_name')
        email_id=request.POST.get('email')
        password = request.POST.get('password')
        profile_picture = request.FILES.get('profile_picture')

        user = User.objects.create_user(username=email_id, email=email_id, password=password, first_name=first_name, last_name=last_name)
        user_data=User_Data(user=user,profile_picture=profile_picture)
        user_data.save()
        user_id=user.id
        return redirect('signin', user_id=user_id)
    return render(request,'signup.html')

def signin(request,user_id):
    try:
        user = User.objects.get(id=user_id)
        user_details = User_Data.objects.get(user=user)
        playlists_info = []
        for playlist_url, language in zip(playlists, languages):
            playlist_info = spotify.playlist(playlist_url)
            if playlist_info.get('images'):
                playlist_image_url = playlist_info['images'][0]['url']
            else:
                playlist_image_url = None

            playlists_info.append({
                'url': playlist_url,
                'image_url': playlist_image_url,
                'language': language,
            })

        return render(request, 'main.html', {'user_id': user_id, 'details': user_details, 'playlists_info': playlists_info})
    except User.DoesNotExist:
        return render(request, 'home.html')


def playlist_tracks(request,playlist_url):
    playlist_info = spotify.playlist(playlist_url)

    playlist_tracks = []
    for track in playlist_info['tracks']['items']:
        track_name = track['track']['name']
        track_preview_url = track['track']['preview_url']
        track_album_cover_url = track['track']['album']['images'][0]['url'] if track['track']['album']['images'] else None
        playlist_tracks.append({
            'name': track_name,
            'preview_url': track_preview_url,
            'album_cover_url': track_album_cover_url
        })

        playlist_tracks = playlist_tracks[:5]



    return render(request, 'playlist_tracks.html', {'playlist_tracks': playlist_tracks})


def add_to_playlist(request):
    if request.method=='POST':
        name=request.POST.get('track_name')
        image_url=request.POST.get('album_cover_url')
        audio_url=request.POST.get('preview_url')
        user=request.user
        playlist_create=Playlist(user=user,name=name,image_url=image_url,audio_url=audio_url)
        playlist_create.save()

    return render(request, 'playlist_tracks.html', {'playlist_tracks': playlist_tracks})
    
def test(request,user_id):
    try:
        user = User.objects.get(id=user_id)
        user_details = User_Data.objects.get(user=user)
        playlist_info = spotify.playlist(Best_Songs)

        playlist_tracks = []
        for track in playlist_info['tracks']['items']:
            track_name = track['track']['name']
            track_preview_url = track['track']['preview_url']
            track_album_cover_url = track['track']['album']['images'][0]['url'] if track['track']['album']['images'] else None
            if(track_album_cover_url!=None):
                playlist_tracks.append({
                    'name':track_name[:35] + '...' if len(track_name) > 35 else track_name
,
                    'preview_url': track_preview_url,
                    'album_cover_url': track_album_cover_url
                })

            

        return render(request, 'test.html', {'user_id': user_id, 'details': user_details, 'playlists_info': playlist_tracks})
    except User.DoesNotExist:
        return render(request, 'home.html')
    

def language_zone(request,user_id):
    user = User.objects.get(id=user_id)
    user_details = User_Data.objects.get(user=user)
    playlist_languages=[]
    for playlist,language in zip(playlists,languages):
        info = spotify.playlist(playlist)
        if info.get('images'):
            image_url = info['images'][0]['url']
        else:
            image_url = None
        
        playlist_languages.append({
                'image_url':image_url,
                'language':language
            })


    return render(request, 'languages.html',{'user_id':user_id,'details':user_details,'playlist_languages': playlist_languages})