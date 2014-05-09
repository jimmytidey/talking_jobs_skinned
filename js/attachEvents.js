job_player.attachEvents = function(player_instance) {
    
    var local_player_instance = player_instance;    
    
    job_player.notes(local_player_instance);
    
    $('.info_button').click(function(){
        job_player.triggerMoreInfoModal(local_player_instance); 
		$(".more_info_modal").toggleClass("hide");
		$(".tab_player").toggleClass("info_open");
        if(local_player_instance.player) {
            local_player_instance.player.pause();
        }
    });

    $('.more_info_modal .close').click(function( event ){
		$(".more_info_modal").addClass("hide");
		$(".tab_player").removeClass("info_open");
		event.preventDefault();
    });

    $('.modal_controls .start').click(function( event ){
		$(".welcome_modal").addClass("hide");
		$(".jobs_player").removeClass("hide");
		// Sometimes the welcome screen may be scrolled down
		// to where the start button is. Move the window back to
		// the top, just in case it has been scrolled
		window.scrollTo(0, 0);
		// iScroll doesn't work properly when elements are
		// set to display none - it can't calculate the height.
		// But we can trigger a refresh to get it to update itself
		if( player_instance.myScroll ) {
		    setTimeout(function () {
		       player_instance.myScroll.refresh();
		    }, 100);
		}
		
		if ($('#israndom').is(':checked')) { 
            job_player.setRandomMode(player_instance);
            job_player.playlistChange(0, player_instance, true);
        }
        else { 
            job_player.setInterviewMode(player_instance);
            job_player.playlistChange(0, player_instance, false);
        }
    });
    
    $('.interviewee_select select').unbind();
    $('.interviewee_select select', player_instance.elem).change(function(val){
        var interviewee_no = $(this).val();
        var question_no = $('.question_selector.selected').attr('data-id');
        job_player.setNormalMode(local_player_instance);
        var target_id = job_player.findPlaylistID(interviewee_no, question_no, local_player_instance);
        job_player.playlistChange(target_id, local_player_instance, true);
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
    $('.question_type').unbind();
    $('.question_type').click(function(){ 
        
        var current_item = player_instance.playlist[player_instance.playlist_position]; 
        var type_no         = $(this).attr('data-type');
        
        var playlist_no = job_player.getPlaylistIdByQuestionType(current_item.interviewee_id, type_no, local_player_instance);
        
        var playlist_item = local_player_instance.playlist[playlist_no];
        
        var question_top_offset = 0 - job_player.questionPosition(playlist_item.question_id, player_instance);
        var target_elem = $('.question_selector[data-id="'+ playlist_item.question_id +'"]' );
        
        if($('html.lt-ie9').length==0) { 
            player_instance.myScroll.scrollTo(0, question_top_offset, 500);
        } else {
            $('.scroller_wrapper').scrollTo(target_elem, 300);
        } 
    });
    
    $('.camera_button').click(function(){
        var current_item = local_player_instance.playlist[local_player_instance.playlist_position]; 
        if($('.then_image').length === 0){
            $('.mejs-container').prepend('<div class="then_image"><img src="'+current_item.then_image+'" /></div>');
        } else { 
            $('.then_image').remove();
        }
    });
    
    
    //Favourites events 
    $('.email_favs').click(function(){
       job_player.emailFavs(local_player_instance); 
       _trackEvent('Save', 'Favourites', 'Email', 5, false);
    });
    
    $('.print_favs').click(function(){
       job_player.printFavs(local_player_instance); 
       _trackEvent('Save', 'Favourites', 'Print', 5, false);
    });
    
    $('.save_favs').click(function(){
       job_player.downloadFavs(local_player_instance); 
       _trackEvent('Save', 'Favourites', 'Download', 5, false);
    });
    
    
     //Reflections events 
    $('.email_reflections').click(function(){ 
        job_player.emailReflections(local_player_instance);
        _trackEvent('Save', 'Reflections', 'Email', 5, false);
    });

    $('.download_reflections').click(function(){ 
        job_player.downloadReflections(local_player_instance);
        _trackEvent('Save', 'Reflection', 'Download', 5, false);
    });
    
    $('.print_reflections').click(function(){ 
        job_player.printReflections(local_player_instance);
        _trackEvent('Save', 'Reflection', 'Print', 5, false);
    });
    
   
    //Question events 
    $('.email_question').click(function(){ 
        job_player.emailQuestion(local_player_instance);
        _trackEvent('Question', 'Question', 'Email', 5, false);
    }); 
    
    $('.download_question').click(function(){ 
        job_player.downloadQuestion(local_player_instance);
        _trackEvent('Question', 'Question', 'Download', 5, false);

    });
    
    $('.print_question').click(function(){ 
        job_player.printQuestion(local_player_instance);
        _trackEvent('Question', 'Question', 'Print', 5, false);

    });
    
    $('.tab_buttons li').click(function(){       
        local_player_instance.player.pause();
    });
    
    
    $('.lowres_interviewee, .lowres_question').change(function(){
        job_player.updateLowRes(local_player_instance);
    });
    
    job_player.updateLowRes(local_player_instance);
};

job_player.updateLowRes = function(local_player_instance) { 
    var interviewee_id = parseInt($('.lowres_interviewee').val());
    var question_id = parseInt($('.lowres_question').val());
    var pl_object = job_player.getObjectFromPlaylist(interviewee_id, question_id, local_player_instance);
    $('.lowres_view').attr('href', pl_object.video);

}

job_player.attachTransportEvents = function(local_player_instance) { 
    $('.interviewee_selector').unbind();
    $('.interviewee_selector').click(function(){      
        var interviewee_no = $(this).attr('data-id');
        var question_no = $('.question_selector.selected').attr('data-id');
        job_player.setNormalMode(local_player_instance);
        var target_id = job_player.findPlaylistID(interviewee_no, question_no, local_player_instance);
        job_player.playlistChange(target_id, local_player_instance, true);
    });

        
    //for clicks on the question scroller 
    $('.question_selector').unbind();    
    $('.question_selector').click(function(){
        var question_no     = $(this).attr('data-id');
        var interviewee_no  = local_player_instance.playlist[local_player_instance.playlist_position].interviewee_id;
        job_player.setNormalMode(local_player_instance);
        var playlist_no = job_player.findPlaylistID(interviewee_no, question_no, local_player_instance);
        job_player.playlistChange(playlist_no, local_player_instance, true);
		$(window).scrollTo(0, 0);
    });
    

    job_player.favourites(local_player_instance);
    
    //navigation buttons 
    $('.prev_track_btn, .previous_button').unbind();
    $('.prev_track_btn, .previous_button').click(function(){
        job_player.playlistChange(local_player_instance.playlist_position-1, local_player_instance, true);
    });

    $('.next_track_btn, .next_button').unbind();    
    $('.next_track_btn, .next_button').click(function(){
        var next_number = local_player_instance.playlist_position+1;
        job_player.playlistChange(next_number, local_player_instance, true);
    });

    $('.restart_video_btn').unbind();    
    $('.restart_video_btn').click(function(){ 
        local_player_instance.player.setCurrentTime(0);
    });
    
    //subitles
    $('.mejs-captions-button button').unbind();
    $('.mejs-captions-button button').click(function(){
        
        if($('.mejs-captions-selector ul li:first-child input').is(':checked')) { 
            local_player_instance.subtitles_on = true;
            $('.mejs-captions-selector ul li:nth-child(2) input').click();
        } 
        else { 
            local_player_instance.subtitles_on = false;
            $('.mejs-captions-selector ul li:first-child input').click();
        }
        
    });
}