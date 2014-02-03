job_player.drawPlayer = function(player_instance, autoplay){
    
    
    if(typeof player_instance.video !== 'undefined') { 
        player_instance.video = null;
    }
    
    var current_item = player_instance.playlist[player_instance.playlist_position];
        
    //set subtitles 
    var subtitles_src = 'xml_converter.php?target='+current_item.subtitles_url;

    //WHAAA?? Chrome has bug that causes video requests to fail unless you make them different every time 
    // so you have to add the timestampt to the end
    var timestamp = new Date().getTime();
    var video_src =  current_item.video + "?" + timestamp;
      
    //get poster URL
    if(player_instance.mode= 'normal'){
        var poster_src = current_item.now_image;
    } 
    
    else {
        var poster_src = null;
    }
    //add in new HTML
    $('.video_container').empty();
    
    var html = '<video id="video_player" preload="auto" poster="'+poster_src+'" type="video/mp4" width="640" height="360" style="width: 100%; height: 100%;" src="' + video_src + '" class="video_player" controls="controls"> <track id="subtitles" kind="subtitles" src="'+subtitles_src+'" srclang="en" /> <object width="640" height="360" type="application/x-shockwave-flash" data="media_elements/build/flashmediaelement.swf"> <param name="movie" value="media_elements/build/flashmediaelement.swf" /> <param name="flashvars" value="controls=true&file='+video_src+'" /> </object> </video>';

    
    $('.video_container').html(html);
    
     
    //draw the video player
    var options = {
        alwaysShowControls: true,
        loop: false,
        translationSelector: false,
        success: function (media, node, player) {  
           
            $('.mejs-playpause-button').after('<div class="next_track_btn"> &raquo;</div>');
            $('.mejs-playpause-button').after('<div class="prev_track_btn"> &laquo;</div>');
            $('.mejs-playpause-button').after('<div class="restart_video_btn"> &lt;</div>');
            var width = $('.mejs-time-rail').css('width');
            $('.mejs-time-rail').css('width', width -120);
            $('.mejs-time-rail').after('<div class="add_video_btn"> + </div>');
            
            player_instance.media = player;
            player_instance.video = player;
            
            media.addEventListener("ended", function() {
                if(player_instance.mode == 'normal'){ 
                    $(".mejs-inner").find(".mejs-poster").show();
                } else { 
                    job_player.playlistChange(player_instance.playlist_position +1 , player_instance, true);
                }
            });
            
            job_player.attachTransportEvents(player_instance);
            
            //if it's autoplaying, don't show posters
            if (autoplay) {
               $('video').attr('poster', null);
               player_instance.video.play();
               
            }
        }
    }
    
        
    //Old IE cannot play mp4 natively 
    if (isIE()) {  
        options.mode = 'shim';
    }
    
    //Firefox cannot play mp4 natively and must fall back on Flash 
    if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
        options.mode = 'shim';
    }
    
    player_instance.video = $('#video_player').mediaelementplayer(options);     
}