job_player.playlistChange = function(val, player_instance, autoplay) {
   
    var local_player_instance = player_instance; 
    
    player_instance.playlist_position = val;
    
    var current_item = player_instance.playlist[player_instance.playlist_position];   

    //set poster 
    $('video').attr('poster', current_item.now_image );
    //player_instance.video.poster = current_item.now_image;
    
    $('.interviewee_select select', this.elem).val(current_item.interviewee_id);
    
    //profession
   
    if(!current_item.contributor) {
        
        $('.interviewee_profession', this.elem).hide();
    }
    else { 
        $('.interviewee_profession', this.elem).show();
    }
    $('.interviewee_profession', this.elem).text(current_item.job_title);
    
    //name 
    if(!current_item.job_title) { 
        $('.interviewee_name', this.elem).hide();
    }
    else { 
        $('.interviewee_name', this.elem).show();
    }
    $('.interviewee_name', this.elem).text(current_item.contributor); 
    
    
    
    
    $('.interviewee_selector').removeClass('selected');
    
    $('.interviewee_selector[data-id="'+ current_item.interviewee_id +'"]' ).addClass('selected');
    
    $('.question_selector').removeClass('selected');
    
    var target_elem = $('.question_scroller [data-id="'+ current_item.question_id +'"]' ).addClass('selected');
    
    //set subtitles 
    var st_src = 'xml_converter.php?target='+current_item.subtitles_url;

    $('#subtitles').attr('src', st_src);

    //WHAAA?? Chrome has bug that causes video requests to fail unless you make them different every time 
    // so you have to add the timestampt to the end
    var timestamp = new Date().getTime();
    var video_src =  current_item.video + "?" + timestamp;
    var video_src =  current_item.video;
    
    player_instance.video.findTracks();
    player_instance.video.loadTrack(0);

    player_instance.video.setSrc(video_src);
    
    //now everything is set, reload the video
    player_instance.video.load();
    
    if (autoplay) {
        player_instance.video.play();
    }
    

    if (job_player.detectWidth() === 'big') { 
        var target_no = parseInt(current_item.interviewee_id) -3; 
    }
    else { 
        var target_no = parseInt(current_item.interviewee_id) -2; 
    }
    
    $(".interviewee_scroller").trigger("slideTo", target_no );

    
    //ensure question is showing
    var question_vis = job_player.testQuestionVisibility(current_item.question_id, player_instance);
    
    if(! question_vis) {
        target_elem = $('.question_selector[data-id="'+current_item.question_id+'"]');
        
        $('.question_scroller').scrollTo(target_elem);
    }
    
    //update question number indicator
    var question_number = parseInt(current_item.question_id) + 1;
    console.log('question_no', question_number);
    $('.question_no_indicator').html(question_number);
    
};