job_player.playlistChange = function(val, player_instance, autoplay) {

    var local_player_instance = player_instance;    
    player_instance.playlist_position = val;
    
    var current_item = player_instance.playlist[player_instance.playlist_position]; 

    //set poster 
    $('video').attr('poster', current_item.now_image );
    $('.interviewee_select select', this.elem).val(current_item.interviewee_id);
    
    
    //profession - hide if it isn't set
    if(!current_item.contributor) {
        $('.interviewee_profession', this.elem).hide();
    }
    else { 
        $('.interviewee_profession', this.elem).show();
    }
    $('.interviewee_profession', this.elem).text(current_item.job_title);
    
    
    //name - hide if it isn't set
    if(!current_item.job_title) { 
        $('.interviewee_name', this.elem).hide();
    }
    else { 
        $('.interviewee_name', this.elem).show();
    }
    
    //scroll to interviewee 
    $('.interviewee_name', this.elem).text(current_item.contributor); 
    $('.interviewee_selector').removeClass('selected');
    $('.interviewee_selector[data-id="'+ current_item.interviewee_id +'"]' ).addClass('selected');
    
    //scroll to interviewee
    if (job_player.detectWidth() === 'big') { 
        var target_no = parseInt(current_item.interviewee_id) -2; 
    }
    else { 
        var target_no = parseInt(current_item.interviewee_id) -2; 
    }
    
    
    $(".interviewee_scroller").trigger("slideTo", [target_no, null, null, {scroll: { 

        easing          : "elastic",
        duration        : 1000,                         
        pauseOnHover    : true
	}}] );
     
    //scroll to question  
    $('.question_selector').removeClass('selected');
    
    var target_elem = $('.question_selector[data-id="'+ current_item.question_id +'"]' );
    target_elem.addClass('selected');

    
    var question_top_offset = 0 - job_player.questionPosition(current_item.question_id, player_instance);
    if( player_instance.myScroll )
	{   
	    if($('html.lt-ie9').length==0) { 
	        player_instance.myScroll.scrollTo(0, question_top_offset, 500);
	    } else {
	        $('.scroller_wrapper').scrollTo('.question_selector.selected .question', 300);
	    }
	}

    
    job_player.drawPlayer(player_instance, autoplay);
    
    //the carousel has to be triggered every time the playlist changes 
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
            //items           : 3,
            easing          : "elastic",
            duration        : 1000, 
		},
		width:'100%', 
		align: 'left',
		height:'70px'		
	}); 
    
    
};