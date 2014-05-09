job_player.drawPlayer = function(player_instance, autoplay){
    

    if(typeof player_instance.player == 'undefined') {
        
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

    if(player_instance.player) {
        //player_instance.player && !isIE() 
        player_instance.player.setSrc = 'a';
		player_instance.player.load();
        player_instance.player.remove();
        window.player_root = null;
        player_instance.media = null; 
    }
    
    player_instance.autoplay = autoplay;
    
    var current_item = player_instance.playlist[player_instance.playlist_position];
        
    //set subtitles 
    player_instance.subtitles_src = 'xml_converter.php?target='+current_item.subtitles_url;
    

    //WHAAA?? Chrome has bug that causes video requests to fail unless you make them different every time 
    // so you have to add the timestampt to the end
    var timestamp = new Date().getTime();
    player_instance.video_src =  current_item.video + "?" + timestamp;
    player_instance.poster_src = current_item.now_image;
        
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
	
    //unbind any events we don't want firing until the player is ready
   
    $('.question_selector').unbind();
    $('.previous_button, .next_button').unbind();
    

    
    //add a poster either in normal mode, or if the player is starting for the first time and isn't random 
    if (player_instance.mode === 'normal' || ( typeof window.player_root == 'undefined' && player_instance.mode !== 'random')) {
        var poster_text = ' poster="'+player_instance.poster_src+'" '; 
    }
    else { 
        var poster_text = ' ';
        
    }

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
            
            $('.mejs-playpause-button').after('<div class="next_track_btn transport_btn"><a style="display:block;" class="interviewee_tooltip" href="#" title="Next video" data-toggle="tooltip" data-placement="top"> &raquo;</a></div>');
            $('.mejs-playpause-button').after('<div class="prev_track_btn transport_btn"><a style="display:block;" class="interviewee_tooltip" href="#" title="Previous video" data-toggle="tooltip" data-placement="top"> &laquo;</a></div>');
            $('.mejs-playpause-button').after('<div class="restart_video_btn"><a style="display:block;" class="interviewee_tooltip" href="#" title="Restart video" data-toggle="tooltip" data-placement="top"> &lt;</a></div>');
            $('.transport_btn').unbind();
            
            var width = $('.mejs-time-rail').css('width');
            $('.mejs-time-rail').css('width', width -120);
            $('.mejs-time-rail').after('<div class="add_video_btn"><a style="display:block;" class="interviewee_tooltip" href="#" title="Add to favourites" data-toggle="tooltip" data-placement="top"> + </a></div>');
           	
			$('.mejs-overlay-play').click(function(){
				//media.play();
		    });
			
			$('.interviewee_tooltip').tooltip({container: 'body'});
            
            
            player_instance.player = player;
            player_instance.media = player;
        
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
            
            media.addEventListener("loadeddata", function(arg1, arg2) {   
                //setTimeout(function(){job_player.attachTransportEvents(player_instance)}, 1500);
            });
        
            
        }
    }
    
    //should subtitles be on? 
    if(player_instance.subtitles_on) {
        options.startLanguage =  'en';
        $('.mejs-captions-selector').find('input[value="en"]').attr("checked", 'checked');
    }
        
    //Old IE cannot play mp4 natively 
    if (isIE()) {  
        options.mode = 'shim';
    }
    
    //add in new HTML
    $('#video_player').remove();
    $('.video_container').empty();
    //<object width="640" height="360" type="application/x-shockwave-flash" data="media_elements/build/flashmediaelement.swf"> <param name="movie" value="media_elements/build/flashmediaelement.swf" /> <param name="flashvars" value="controls=true&file='+player_instance.video_src+'" /> </object>
    var html = '<video   id="video_player" '+ poster_text +' type="video/mp4" width="640" height="360" style="width: 100%; height: 100%;" src="' + player_instance.video_src + '" class="video_player" controls="controls"> <track id="subtitles" kind="subtitles" src="'+player_instance.subtitles_src+'" srclang="en" />  </video>';
    $('.video_container').html(html);

    window.player_root = new MediaElementPlayer('#video_player',options);
    //$('#video_player').mediaelementplayer(options);
    setTimeout(function(){job_player.attachTransportEvents(player_instance)}, 1500);
}