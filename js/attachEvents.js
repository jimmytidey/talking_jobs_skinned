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
		
		if ($('#israndom').is(':checked')) { 
            job_player.setRandomMode(player_instance);
            job_player.playlistChange(0, player_instance, true);
        }
        else { 
            job_player.setInterviewMode(player_instance);
            job_player.playlistChange(0, player_instance, false);
        }
    });
    
    $('.interviewee_select select', player_instance.elem).change(function(val){
        var interviewee_no = $(this).val();
        var question_no = $('.question_selector.selected').attr('data-id');
        job_player.setNormalMode(local_player_instance);
        var target_id = job_player.findPlaylistID(interviewee_no, question_no, local_player_instance);
        job_player.playlistChange(target_id, local_player_instance, true);
    });
    
    
    //for clicks on the interviewee scroller 
    $('.interviewee_selector').click(function(){ 
        var interviewee_no = $(this).attr('data-id');
        var question_no = $('.question_selector.selected').attr('data-id');
        job_player.setNormalMode(local_player_instance);
        var target_id = job_player.findPlaylistID(interviewee_no, question_no, local_player_instance);
        job_player.playlistChange(target_id, local_player_instance, true);
        
    });
        
    //for clicks on the question scroller 
    $('.question_selector').click(function(){
        var question_no     = $(this).attr('data-id');
        var interviewee_no  = local_player_instance.playlist[local_player_instance.playlist_position].interviewee_id;
        var playlist_no = job_player.findPlaylistID(interviewee_no, question_no, local_player_instance);
        job_player.setNormalMode(local_player_instance);
        job_player.playlistChange(playlist_no, local_player_instance, true);
    });

    //set modes 
    $('.whole_interview_order').click(function(){
        job_player.setInterviewMode(local_player_instance);
    });
    
    $('.whole_question_order').click(function(){ 
        job_player.setQuestionMode(local_player_instance);
    });

    $('.random_order').click(function(){
        job_player.setRandomMode(local_player_instance);
    });
    
    //make the question type buttons work
    $('.question_type').click(function(){ 
        var interviewee_no  = local_player_instance.playlist[local_player_instance.playlist_position].interviewee_id;
        var type_no         = $(this).attr('data-type');
        var playlist_no = job_player.getPlaylistIdByQuestionType(interviewee_no, type_no, local_player_instance);
        job_player.setNormalMode(local_player_instance); 
        job_player.playlistChange(playlist_no, local_player_instance, true);
    });
    
     
    $('.email_reflections').click(function(){ 
        job_player.emailReflections(local_player_instance);
    });
   
    $('.email_question').click(function(){ 
        job_player.emailQuestion(local_player_instance);
    });
    
    $('.email_favs').click(function(){
       job_player.emailFavourites(local_player_instance); 
    });
    

    $('.tab_buttons li').click(function(){       
        local_player_instance.media.stop();
    });
    
};

job_player.attachTransportEvents = function(local_player_instance) { 
    
    console.log('hi');
    
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