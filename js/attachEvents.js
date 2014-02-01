job_player.attachEvents = function(player_instance) {

    var local_player_instance = player_instance;    
    
    job_player.notes(local_player_instance);
    
    $('.info_button').click(function(){
        job_player.triggerMoreInfoModal(local_player_instance); 
		$(".more_info_modal").toggleClass("hide");
		$(".tab_player").toggleClass("info_open");
    });

    $('.more_info_modal .close').click(function( event ){
		$(".more_info_modal").addClass("hide");
		$(".tab_player").removeClass("info_open");
		event.preventDefault();
    });

    $('.modal_controls .start').click(function( event ){
		$(".welcome_modal").addClass("hide");
		$(".jobs_player").removeClass("hide");
		event.preventDefault();
    });
    
    $('.interviewee_select select', player_instance.elem).change(function(val){
        
        var val = $(this).val();
        
        //find the first playlist item with contribtuor ID 
        for(var i=0; i < player_instance.playlist.length; i++) { 
            if (val === player_instance.playlist[i].interviewee_id) { 
                break;
            }
        }
        
        job_player.playlistChange(i, player_instance, true);
        job_player.setNormalMode(local_player_instance);
    });
    
    
    //for clicks on the interviewee scroller 
    $('.interviewee_selector').click(function(){ 
        var val = $(this).attr('data-id');
        
        //find the first playlist item with contribtuor ID 
        for(var i=0; i < local_player_instance.playlist.length; i++) { 
            if (val === local_player_instance.playlist[i].interviewee_id) { 
                break;
            }
        }
     
        job_player.playlistChange(i, local_player_instance, true);
        job_player.setNormalMode(local_player_instance);
    });
        
    //for clicks on the question scroller 
    $('.question_selector').click(function(){
        var question_no     = $(this).attr('data-id');
        var interviewee_no  = local_player_instance.playlist[local_player_instance.playlist_position].interviewee_id;
        var playlist_no = job_player.findPlaylistID(interviewee_no, question_no, local_player_instance);
        job_player.playlistChange(playlist_no, local_player_instance, true);
        job_player.setNormalMode(local_player_instance);
        
    });

    //set modes 
    $('.whole_interview_order').click(function(){ 
        job_player.clearModeButtons();
        job_player.setInterviewMode(local_player_instance);
        $(this).addClass('active');
    });
    
    $('.whole_question_order').click(function(){ 
        job_player.clearModeButtons();
        job_player.setQuestionMode(local_player_instance);
        $(this).addClass('active');
    });

    $('.random_order').click(function(){
        job_player.clearModeButtons();
        $('.random_order').addClass('active');
        job_player.setRandomMode(local_player_instance);
    });
    
    //make the question type buttons work
    $('.question_type').click(function(){ 
        var interviewee_no  = local_player_instance.playlist[local_player_instance.playlist_position].interviewee_id;
        var type_no         = $(this).attr('data-type');
        var playlist_no = job_player.getPlaylistIdByQuestionType(interviewee_no, type_no, local_player_instance);
        job_player.playlistChange(playlist_no, local_player_instance, true);        
    });
    
    //make the email send work for reflections  
    $('.email_reflections').click(function(){ 
        job_player.emailReflections(local_player_instance);
    });
    
    
    //set the player to zero for init
    job_player.playlistChange(0, local_player_instance, false);
    
};

job_player.attachTransportEvents = function(local_player_instance) { 
    
    job_player.favourites(local_player_instance);
    
    //navigation buttons 
    $('.prev_track_btn').unbind();
    $('.prev_track_btn').click(function(){
        job_player.playlistChange(local_player_instance.playlist_position-1, local_player_instance, true);
    });

    $('.next_track_btn').unbind();    
    $('.next_track_btn').click(function(){
        var next_number = local_player_instance.playlist_position+1;
        job_player.playlistChange(next_number, local_player_instance, true);
    });

    $('.restart_video_btn').unbind();    
    $('.restart_video_btn').click(function(){ 
        local_player_instance.video.setCurrentTime(0);
    });
   

    
    
}