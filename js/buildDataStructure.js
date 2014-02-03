

job_player.buildDataStructure = function(player_instance) { 
    
    var local_player_instance = player_instance;

    //build the playlist stucture 
    $.each(player_instance.interviews_json.talking_jobs.interview_responses.interview, function(interview_key, interview_value){

        var player_instance = this.player_instance;
        $.each(interview_value.responses.response, function(response_key, response_value ) {
            
            var playlist_object             = {};
            var subtitle_bodge              = response_value['_src'].split("/")[3];
            playlist_object.interviewee_id  = interview_value['_id']; 
            playlist_object.about_training  = interview_value.about_training['__cdata'];
            playlist_object.contributor     = interview_value.contributor['__cdata'];
            playlist_object.job_prefix      = interview_value.job_prefix['__cdata']; 
            playlist_object.job_title       = interview_value.job_title['__cdata'];
            playlist_object.now_image       = interview_value.now_image['_src'];
            playlist_object.question        = local_player_instance.questions_json.talking_jobs.questions.question[response_key]['__cdata'];
            playlist_object.question_id     = response_value['_question_id'];
            playlist_object.subtitles_url   = local_player_instance.subtitles_folder + subtitle_bodge  + "_track0.xml";
            playlist_object.question_type   = local_player_instance.questions_json.talking_jobs.questions.question[response_key]['_type'];
            playlist_object.video           = response_value['_src'] + ".mp4";
            
            local_player_instance.playlist.push(playlist_object);
        });
    }); 
    
    
    //build a list of each interview  
    $.each(player_instance.interviews_json.talking_jobs.interview_responses.interview, function(interview_key, interview_value ){
        local_player_instance.interviewees.push({interviewee: interview_value.job_title, id: interview_value['_id'], now_image: interview_value.now_image['_src']});
    });
    
    //build a list of each question 
    
    $.each(local_player_instance.questions_json.talking_jobs.questions.question, function(question_key, question_value) {
        local_player_instance.questions.push(question_value);
    });
    
    //build a list of question types 
    $.each(local_player_instance.questions_json.talking_jobs.question_types.type, function(question_type_key, question_type_value) {
        local_player_instance.question_types.push(question_type_value);
    });
    
    //build the resources for the drop down 
    local_player_instance.welcome_modal_header = local_player_instance.questions_json.talking_jobs.intro_copy.heading['__cdata'];
    local_player_instance.welcome_modal_text   = local_player_instance.questions_json.talking_jobs.intro_copy.copy['__cdata'];
    local_player_instance.welcome_modal_image  =  local_player_instance.questions_json.talking_jobs.intro_copy.welcome_image;
    
    job_player.drawInterface(player_instance);
};
