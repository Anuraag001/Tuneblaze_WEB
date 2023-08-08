function update(buttonElement){
    var songId = parseInt(buttonElement.getAttribute("data-song-id"));
    var albumId = parseInt(buttonElement.getAttribute("data-album-id"));
    var Url = $(buttonElement).data("url");
    //var songId = parseInt($(this).data("song-id"));
    //var albumId = parseInt($(this).data("album-id"));
    //var songId = $(buttonElement).find('input[name="song_id"]').val();
    //var albumId = $(buttonElement).find('input[name="album_id"]').val();
    console.log(songId)
    console.log(albumId)
    console.log(`test/languages/${parseInt(albumId)}/${parseInt(songId)}/`)
    $.ajax({
        type:'GET',
        //url:`../{% url 'update_music_section' ${albumId} ${songId}  %}`,
        url:Url,
        success:function(data){
            $("#song_image").html(`<img src="${data.song_image}" height="50" width="50"  style="border-radius:5px" alt="Song Image"> `);
            $("#song_name").text(data.song_name);
            $("#song_audio").html(`<audio id="audio-player" controls><source src="${data.song_audio}" type="audio/mpeg"></audio>`),
           console.log('success',data)
        }
    });
}

function update_my(buttonElement){
    var songId = parseInt(buttonElement.getAttribute("data-song-id"));
    var userId = parseInt(buttonElement.getAttribute("data-user-id"));
    var Url = $(buttonElement).data("url");
    //var songId = parseInt($(this).data("song-id"));
    //var albumId = parseInt($(this).data("album-id"));
    //var songId = $(buttonElement).find('input[name="song_id"]').val();
    //var albumId = $(buttonElement).find('input[name="album_id"]').val();
    console.log(songId)
    console.log(userId)
    console.log(`test/languages/${parseInt(userId)}/${parseInt(songId)}/`)
    $.ajax({
        type:'GET',
        //url:`../{% url 'update_music_section' ${albumId} ${songId}  %}`,
        url:Url,
        success:function(data){
            $("#song_image").html(`<img src="${data.song_image}" height="50" width="50"  style="border-radius:5px" alt="Song Image"> `);
            $("#song_name").text(data.song_name);
            $("#song_audio").html(`<audio id="audio-player" controls><source src="${data.song_audio}" type="audio/mpeg"></audio>`),
           console.log('success',data)
        }
    });
}