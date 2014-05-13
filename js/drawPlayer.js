job_player.drawPlayer = function(player_instance, autoplay){

    //set parameters for new video   
    var current_item = player_instance.playlist[player_instance.playlist_position];
    player_instance.subtitles_src = 'xml_converter.php?target='+current_item.subtitles_url;
    player_instance.video_src  = current_item.video;
    player_instance.autoplay = autoplay;
    
    //add a poster either in normal mode, or if the player is starting for the first time and isn't random 
    if (player_instance.mode === 'normal' || ( typeof window.player_root == 'undefined' && player_instance.mode !== 'random')) {
        player_instance.poster_src = current_item.now_image; 
    }
    else { 
       player_instance.poster_src = ' ';
    }
    
    //redraw the whole player every time?
    
    if(typeof window.player_root == 'undefined') {
        	$(".interviewee_scroller").carouFredSel({
        		auto: { 
        		    play: false
        		},
        		prev : { 
        		    button: '.carousel_prev'
        		},
        		next : { 
        		    button: '.carousel_next'
        		}, 
        		swipe: { 
        		    onTouch: true
        		},
        		scroll: { 
                    items       : 3,
                    duration    : 1000, 
        		},
        		width:'100%', 
        		align: 'left',
        		height:'70px'		
        	});

        	$(".interviewee_scroller").trigger("slideTo", -2 );
        
    }
    
    if(1==1) { //typeof window.player_root === 'undefined' || player_instance.player.pluginType === 'flash'
        job_player.newPlayer(player_instance);
    } else {

        $('#video_player').attr("poster", player_instance.poster_src);
        
        //set the subtitles
        $('#subtitles').attr('src', player_instance.subtitles_src);
        window.player_root.findTracks();
        window.player_root.loadTrack(0);
        window.player_root.setSrc(player_instance.video_src);
        window.player_root.load();
    
        if(autoplay) { 
            window.player_root.play();
        }
    }
    
}

job_player.newPlayer = function(player_instance) { 
    
    var html = '<video id="video_player" poster='+ player_instance.poster_src +' type="video/mp4" width="640" height="360" style="width: 100%; height: 100%;" src="' + player_instance.video_src + '" class="video_player" controls="controls">   </video>';
    $('.video_container').html(html);
    
    var track = '<track id="subtitles" kind="subtitles" src="'+player_instance.subtitles_src+'" srclang="en" />'
    $('#video_player').html(track);
    
    
    
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
            
            $('.tooltip').remove();
            $('.mejs-playpause-button').after('<div class="next_track_btn transport_btn"><a style="display:block;" class="interviewee_tooltip" href="#" title="Next video" data-toggle="tooltip" data-placement="top"> &raquo;</a></div>');
            $('.mejs-playpause-button').after('<div class="prev_track_btn transport_btn"><a style="display:block;" class="interviewee_tooltip" href="#" title="Previous video" data-toggle="tooltip" data-placement="top"> &laquo;</a></div>');
            $('.mejs-playpause-button').after('<div class="restart_video_btn"><a style="display:block;" class="interviewee_tooltip" href="#" title="Restart video" data-toggle="tooltip" data-placement="top"> &lt;</a></div>');
            $('.transport_btn').unbind();
            
            $('.no-touch .interviewee_tooltip').tooltip({container: 'body'});
            
            var width = $('.mejs-time-rail').css('width');
            $('.mejs-time-rail').css('width', width -120);
            $('.mejs-time-rail').after('<div class="add_video_btn"><a style="display:block;" class="interviewee_tooltip" href="#" title="Add to favourites" data-toggle="tooltip" data-placement="top"> + </a></div>');
           	
            job_player.attachTransportEvents(player_instance);

            if(player_instance.subtitles_on) {
                options.startLanguage =  'en';
                $('.mejs-captions-selector ul li:nth-child(2) input').click();
                $('.mejs-captions-selector').find('input[value="en"]').attr("checked", 'checked');
            }
            
            player_instance.player = player;
        
            media.addEventListener("ended", function() {
                
                player_instance.playing_now = false;
                
                if(player_instance.mode === 'normal'){
                    $('#video_player').attr('poster', player_instance.poster_src);
                    $(".mejs-inner").find(".mejs-poster").show();
                } else { 
                    $(".mejs-inner").find(".mejs-poster").hide();
                    job_player.playlistChange(player_instance.playlist_position +1, player_instance, true);
                }
            });
            
        }
    }
    
    window.player_root = new MediaElementPlayer('#video_player', options);

}