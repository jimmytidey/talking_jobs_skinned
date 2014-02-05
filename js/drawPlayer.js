job_player.drawPlayer = function(player_instance, autoplay){
    
    if(player_instance.player) { 
        $('.video_container').empty();
        player_instance.player.setSrc = '';
		player_instance.player.load();
        player_instance.player.remove();
        window.player_root = null; 
        player_instance.media = null; 
    }
    
    player_instance.autoplay = autoplay;
    
    var current_item = player_instance.playlist[player_instance.playlist_position];
        
    //set subtitles 
    player_instance.subtitles_src = 'xml_converter.php?target='+current_item.subtitles_url;
    player_instance.subtitles_src = '';

    //WHAAA?? Chrome has bug that causes video requests to fail unless you make them different every time 
    // so you have to add the timestampt to the end
    var timestamp = new Date().getTime();
    player_instance.video_src =  current_item.video + "?" + timestamp;
      
    player_instance.poster_src = current_item.now_image;
    
    //get poster URL   
    if($('.mejs-overlay-play').css('display') == 'none'){
        $('#video_player').attr('poster', '');
    } 
    
    else {
        $('#video_player').attr('poster', player_instance.poster_src);
    }
    
    //do we need to draw the whole player?
    var redraw = true;
    if(typeof player_instance.player == 'undefined' || redraw) {
        job_player.newPlayer(player_instance);
    }
    else {
        
        $('#subtitles').attr('src', player_instance.subtitles_src);
        
        player_instance.player.findTracks();
        player_instance.player.loadTrack(0);
        player_instance.player.setTrack(0);
        player_instance.player.setCurrentTime(0);
      
        player_instance.player.pause();

        player_instance.player.load();
        if(player_instance.autoplay) { 
            player_instance.player.play();
            player_instance.playing_now = true;
        }
    }
    
       
}

job_player.newPlayer = function(player_instance) { 
    
    //add in new HTML
    $('#video_player').remove();
    $('.video_container').empty();
    
    //<object width="640" height="360" type="application/x-shockwave-flash" data="media_elements/build/flashmediaelement.swf"> <param name="movie" value="media_elements/build/flashmediaelement.swf" /> <param name="flashvars" value="controls=true&file='+player_instance.video_src+'" /> </object>
    var html = '<video id="video_player"  poster="'+player_instance.poster_src+'" type="video/mp4"   src="' + player_instance.video_src + '" class="video_player" controls="controls"> <track id="subtitles" kind="subtitles" src="'+player_instance.subtitles_src+'" srclang="en" />  </video>';
    $('.video_container').html(html);

    console.log($('#video_player').html());

    //draw the video player
    var options = {
        alwaysShowControls: true,
        loop: false,
        translationSelector: false,
        success: function (media, node, player) {          
            if(player_instance.autoplay) {
                
                media.play();
                if (media.pluginType == 'flash') {
                    media.addEventListener('canplay', function() {
                        
                        media.play();
                    }, false);
                }
            }
            
            $('.mejs-playpause-button').after('<div class="next_track_btn transport_btn"> &raquo;</div>');
            $('.mejs-playpause-button').after('<div class="prev_track_btn transport_btn"> &laquo;</div>');
            $('.mejs-playpause-button').after('<div class="restart_video_btn"> &lt;</div>');
            $('.transport_btn').unbind();
            
            var width = $('.mejs-time-rail').css('width');
            $('.mejs-time-rail').css('width', width -120);
            $('.mejs-time-rail').after('<div class="add_video_btn"> + </div>');
            
            
            
            player_instance.player = player;
            player_instance.media = player;
        
            media.addEventListener("ended", function() {
                
                player_instance.playing_now = false;
                
                if(player_instance.mode === 'normal'){ 
                    
                    $('#video_player').attr('poster', player_instance.poster_src);
                    $(".mejs-inner").find(".mejs-poster").show();
                } else { 
                    job_player.playlistChange(player_instance.playlist_position +1, player_instance, true);
                }
            });
            
            media.addEventListener("loadeddata", function(arg1, arg2) {   
                setTimeout(function(){job_player.attachTransportEvents(player_instance)}, 500);
            });
        
            
        }
    }

    
    //Old IE cannot play mp4 natively 
    if (isIE()) {  
        options.mode = 'shim';
    }


    window.player_root = new MediaElementPlayer('#video_player',options);
    //$('#video_player').mediaelementplayer(options);
}