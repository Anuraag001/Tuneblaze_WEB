"""
URL configuration for Tuneblaze project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static

from django.urls import path
from Front.views import *
urlpatterns = [
    path('admin/', admin.site.urls),
    path('', homepage, name='homepage'),
    path('signup/', signup, name='signup'),
    path('<int:user_id>/', signin, name='signin'),
    path('<int:user_id>/languages/test/', language_zone, name='languages'),
    path('<int:user_id>/test/', test, name='test'),
    path('<int:user_id>/my_playlist', my_playlist, name='my_playlist'),
    path('<int:user_id>/languages/test/<int:song_no>/', update_music_section_my, name='update_music_section_my'),
    path('<int:user_id>/test/languages/<int:album_no>/', view_album, name='view_album'),
    path('playlist/<path:playlist_url>/', playlist_tracks, name='playlist_tracks'),
    path('<int:user_id>/add_to_playlist/', add_to_playlist, name='add_to_playlist'),
    path('test/languages/<int:album_no>/<int:song_no>/', update_music_section, name='update_music_section'),
    path('<int:user_id>/genre/test',generes,name='generes'),
    path('<int:user_id>/generes/<str:genere>/',genere_tracks,name='genere_tracks'),
    path('<int:user_id>/artists',all_artists,name='all_artists'),
    path('music_update/<int:song_num>/',main_music_player,name='main_music_player'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
