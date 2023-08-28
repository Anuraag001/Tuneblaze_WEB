$('#loader').hide();
function update(buttonElement) {
    var songId = parseInt(buttonElement.getAttribute("data-song-id"));
    var albumId = parseInt(buttonElement.getAttribute("data-album-id"));
    var Url = $(buttonElement).data("url");
    //$('#loader').show();
    //var songId = parseInt($(this).data("song-id"));
    //var albumId = parseInt($(this).data("album-id"));
    //var songId = $(buttonElement).find('input[name="song_id"]').val();
    //var albumId = $(buttonElement).find('input[name="album_id"]').val();
    //console.log(songId)
    //console.log(albumId)
    //console.log(`test/languages/${parseInt(albumId)}/${parseInt(songId)}/`)
    $.ajax({
        type: 'GET',
        //url:`../{% url 'update_music_section' ${albumId} ${songId}  %}`,
        url: Url,
        success: function (data) {
            $("#song_image").html(`<img src="${data.song_image}" height="50" width="50"  style="border-radius:5px" alt="Song Image"> `);
            $("#song_name").text(data.song_name);
            $("#song_audio").html(`<audio id="audio-player"><source src="${data.song_audio}" type="audio/mpeg"></audio><div class="progress" role="progressbar" aria-label="Example 20px high" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" style="height: 10px;border-radius: 5px;width:100%">
            <div class="progress-bar" style="width: 0%"></div>
          </div>`),
            $('#song_controls').html(`<div><button id="play-btno"><i class="bi bi-skip-backward-fill" ></i></button></div><div><button id="play-btn"><i class="bi bi-play-fill" id="change_me" onclick="icon_change()"></i></button></div><div><button id="play-btno"><i class="bi bi-skip-forward-fill"></i></button></div>`);
           
        },
        /*complete:function(data){
            $('#loader').hide();
            console.log("loader hidden");
        }*/
    });
}

function update_my(buttonElement) {
    var songId = parseInt(buttonElement.getAttribute("data-song-id"));
    var userId = parseInt(buttonElement.getAttribute("data-user-id"));
    var Url = $(buttonElement).data("url");
    //var songId = parseInt($(this).data("song-id"));
    //var albumId = parseInt($(this).data("album-id"));
    //var songId = $(buttonElement).find('input[name="song_id"]').val();
    //var albumId = $(buttonElement).find('input[name="album_id"]').val();
    //console.log(`test/languages/${parseInt(userId)}/${parseInt(songId)}/`)
    $.ajax({
        type: 'GET',
        //url:`../{% url 'update_music_section' ${albumId} ${songId}  %}`,
        url: Url,
        success: function (data) {
            $("#song_image").html(`<img src="${data.song_image}" height="50" width="50"  style="border-radius:5px" alt="Song Image"> `);
            $("#song_name").text(data.song_name);
            $("#song_audio").html(`<audio id="audio-player"><source src=" ${data.song_audio}" type="audio/mpeg"></audio>
            <div class="progress" role="progressbar" aria-label="Example 20px high" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" style="height: 10px;border-radius: 5px;width:100%">
              <div class="progress-bar" style="width: 0%"></div>
            </div>`),
                $('#song_controls').html(`<div><button id="play-btno" onclick="update_my(this)" data-song-id="${data.song_id-1}" data-user-id="${data.user_id}" data-url="/${data.user_id}/languages/test/${data.song_id-1}/"><i class="bi bi-skip-backward-fill"></i></button></div><div><button id="play-btn"><i class="bi bi-play-fill" id="change_me" onclick="icon_change()"></i></button></div><div><button id="play-btno"><i class="bi bi-skip-forward-fill" onclick="update_my(this)" data-song-id="${data.song_id+1}" data-user-id="${data.user_id}" data-url="/${data.user_id}/languages/test/${data.song_id+1}/"></i></button></div>`);
            //console.log('success', data)
            
        },
        
    });
}

function icon_change() {
    var play_pause_toggle = document.getElementById('play-btn');
    var play_pause_btn = document.getElementById('change_me');
    var audio_play = document.getElementById('audio-player');
    var progressbar = document.getElementsByClassName('progress-bar')[0];
    var progress = document.getElementsByClassName('progress')[0];

    let isplaying = false;
    let isdragging = false;

    //console.log('coming inside');
    play_pause_toggle.addEventListener('click', function () {
        if (play_pause_btn.classList.contains('bi-play-fill')) {
            play_pause_btn.classList.remove('bi-play-fill');
            play_pause_btn.classList.add('bi-pause-fill');
            //console.log('pause');
            isplaying = false;
            //bi bi-pause-fill
        } else if (play_pause_btn.classList.contains('bi-pause-fill')) {
            play_pause_btn.classList.remove('bi-pause-fill');
            play_pause_btn.classList.add('bi-play-fill');
            //console.log('play');
            isplaying = true;
        }

        if (isplaying) {
            audio_play.pause();
            //console.log('doing');
        } else {
            audio_play.play();
        }
    });

    audio_play.addEventListener('timeupdate', function () {
        if (!isdragging && isplaying) {
            var update_time = (audio_play.currentTime / audio_play.duration) * 100;
            progressbar.style.width = update_time + '%';
        }
    });
    var put_data = document.getElementById('show');
    put_data.innerHTML = `${audio_play.currentTime}  /  ${audio_play.duration}`;
    setInterval(icon_change, 1000);
    progress.addEventListener('click', function (event) {
        //console.log('you clicked');
        //console.log('my:', event.clientX)
        var progressbar_rect = progressbar.getBoundingClientRect();
        var progress_rect = progress.getBoundingClientRect();
        //console.log(progress_rect.right)
        //console.log(progressbar_rect.right)
        var new_position = event.clientX - progress_rect.left;
        //console.log(new_position)
        var change = (new_position / progress_rect.width) * 100;
        var new_time = (new_position / progress_rect.width) * audio_play.duration;
        progressbar.style.width = change + '%';
        audio_play.currentTime = new_time;
    })
}

function load_languages(buttonElement){
    $('#loader').show();
    var Url = $(buttonElement).data("url");
    $.ajax({
        type:'GET',
        url:Url,
        //dataType:'json',
        success:function(data){
            $('#song_data').empty();
            var one=`<div id="middle">
            <div id="gap"></div>
            <h2>Best Songs</h2>
            <br>
            <div class="input-group mb-3">
                <input type="text" class="form-control" id="search" placeholder="Search by song,artist,language" aria-label="Recipient's username" aria-describedby="button-addon2">
                <button class="btn btn-outline-secondary" type="button" id="button-addon2" style="border: none;"><i class="bi bi-search" ></i></button>
            </div>
            <br><div id="all_best_songs">`;
            console.log("ond");
            let i=0;
            data.forEach(function(playlist_in){
                console.log("in");
                one+=`
                <div id="playlist_info">
                <a href="/${11}/test/languages/${i}/">
                <img src="${playlist_in.image_url}" alt="Playlist Image" height="100" width="100">
                </a>
                <div id="trunk">${playlist_in.language }</div>
                </div> `
                i++;
            });
            one+=`</div></div>`
            console.log("Not refreshing");
            $('#song_data').append(one);
        },
        complete:function(data){
            console.log("completed");
            $('#loader').hide();
        }
    })
}

