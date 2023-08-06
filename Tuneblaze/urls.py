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
    path('',homepage,name='homepage'),
    path('signup/',signup,name='signup'),
    path('<int:user_id>/',signin,name='signin'),
    path('playlist/<path:playlist_url>/',playlist_tracks,name='playlist_tracks'),
    path('add_to_playlist/', add_to_playlist, name='add_to_playlist'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
