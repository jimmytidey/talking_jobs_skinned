
(function($, window, undefined) {
    
    $.widget('custom.job_player', {
        
        _create: function () {
            //containers for data from the JSON 
            this.options.interviews_json    = 
            this.options.playlist                   = [];
            this.options.questions                  = []; 
            this.options.interviewees               = []; 
            this.options.question_types             = []; 
            
            //settings 
            this.options.playlist_position          = 0;
            this.options.welcome_modal_header       = '';
            this.options.welcome_modal_text         = ''; 
            this.options.welcome_modal_image        = '';  
			this.options.subtitles_folder           = 'modules/yssg/subtitles/';
            this.options.xml_url                    = "modules/yssg/";
            this.options.subtitles_on               = false;

            //Go! 
            this.options.elem = this.element; 
            this.options.mode = 'whole_interview'; //could also be whole_interview or random or whole_question
            job_player.getData(this.options);
        }
    });
    
}(jQuery,window));



