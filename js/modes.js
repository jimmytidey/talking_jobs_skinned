
job_player.setNormalMode = function(player_instance) { 
    //TODO: refector UI out of this function 
    player_instance.mode = 'normal';
    job_player.clearModeButtons(player_instance);
    
    var new_playlist = [];
    var current_question_id     = player_instance.playlist[player_instance.playlist_position].question_id;
    var current_interviewee_id  = player_instance.playlist[player_instance.playlist_position].interviewee_id;
    
     
    for(var j = 0; j< player_instance.interviewees.length; j++) {
        for(var i = 0; i< player_instance.questions.length; i++) { 
            new_playlist.push(job_player.getObjectFromPlaylist(j,i,player_instance));
        }
    }
    
    player_instance.playlist = new_playlist;
  
    var new_playlist_id = job_player.findPlaylistID(current_interviewee_id, current_question_id, player_instance);
    
    player_instance.playlist_position = new_playlist_id;
    
    if(player_instance.player && player_instance.player.media.paused) { 
        job_player.playlistChange(player_instance.playlist_position, player_instance, true);
    }
    
}


job_player.setRandomMode = function(player_instance) {
    job_player.clearModeButtons();
    $('.random_order').addClass('active');
    player_instance.mode = 'random';
    player_instance.playlist = job_player.shuffle(player_instance.playlist);
    
    if(player_instance.player && player_instance.player.media.paused) { 
        job_player.playlistChange(1, player_instance, true);
    }
}

job_player.setQuestionMode = function(player_instance) { 
    
    job_player.clearModeButtons();
    $('.whole_question_order').addClass('active');
    
    var current_question_id     = player_instance.playlist[player_instance.playlist_position].question_id;
    var current_interviewee_id  = player_instance.playlist[player_instance.playlist_position].interviewee_id;
    var new_playlist = [];
    
    player_instance.mode = 'whole_question';
  
    for(var i = 0; i< player_instance.questions.length; i++) { 
        for(var j = 0; j< player_instance.interviewees.length; j++) {
            new_playlist.push(job_player.getObjectFromPlaylist(j,i,player_instance));
        }
    }
    
    player_instance.playlist = new_playlist;
  
    var new_playlist_id = job_player.findPlaylistID(current_interviewee_id, current_question_id, player_instance);
    
    
    
    player_instance.playlist_position = new_playlist_id;
    if(player_instance.player && player_instance.player.media.paused) { 
        job_player.playlistChange(player_instance.playlist_position, player_instance, true);
    }
   
}

job_player.setInterviewMode = function(player_instance) { 
    job_player.clearModeButtons();
    $('.whole_interview_order').addClass('active');
    
    var current_question_id     = player_instance.playlist[player_instance.playlist_position].question_id;
    var current_interviewee_id  = player_instance.playlist[player_instance.playlist_position].interviewee_id;
    var new_playlist = [];
  
    player_instance.mode = 'whole_interview';
        
    for(var j = 0; j< player_instance.interviewees.length; j++) {
        for(var i = 0; i< player_instance.questions.length; i++) { 
            new_playlist.push(job_player.getObjectFromPlaylist(j,i,player_instance));
        }
    }
    
    player_instance.playlist = new_playlist;
    var new_playlist_id = job_player.findPlaylistID(current_interviewee_id, current_question_id, player_instance);
    player_instance.playlist_position = new_playlist_id;
    
    if(player_instance.player && player_instance.player.media.paused) { 
        job_player.playlistChange(player_instance.playlist_position, player_instance, true);
    }
}

job_player.initModes = function(player_instance) { 
    if(player_instance.mode == 'whole_question') { 
        job_player.clearModeButtons();
        job_player.setQuestionMode(player_instance);
        $('.btn.whole_question_order', player_instance.elem).addClass('active');
    }
    
    if(player_instance.mode == 'whole_interview') { 
        job_player.clearModeButtons();
        job_player.setInterviewMode(player_instance);
        $('.btn.whole_interview_order', player_instance.elem).addClass('active');
    }
    
    if(player_instance.mode == 'random') {
        job_player.clearModeButtons();
        job_player.setRandomMode(player_instance);
        $('.random_order').addClass('active');
        $('.btn.random_order', player_instance.elem).addClass('active');
    }
    job_player.drawPlayer(player_instance, true);
}