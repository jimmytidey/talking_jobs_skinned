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
        var target_no = parseInt(current_item.interviewee_id) -3; 
    }
    else { 
        var target_no = parseInt(current_item.interviewee_id) -2; 
    }
    $(".interviewee_scroller").trigger("slideTo", target_no );
     
    //scroll to question  
    $('.question_selector').removeClass('selected');
    var target_elem = $('.question_selector[data-id="'+ current_item.question_id +'"]' );
    target_elem.addClass('selected');
    
    
    
    var question_top_offset = job_player.questionPosition(current_item.question_id, player_instance);
    
    $('.scroller_wrapper').scrollTo('.question_selector.selected .question', 1200);
    
    
    job_player.drawPlayer(player_instance, autoplay);
    
};