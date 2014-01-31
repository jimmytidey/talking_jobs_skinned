

(function($, window, undefined) {
    
    $.widget('custom.job_player', {
        
        _create: function () {
            //containers for data from the JSON 
            this.options.interviews_json    = ''//container for the interviews data from XML
            this.options.playlist           = [];
            this.options.questions          = []; 
            this.options.interviewees       = []; 
            this.options.question_types     = []; 
            this.options.playlist_position  = 0;
            this.options.welcome_modal_header       = '';
            this.options.welcome_modal_text         = ''; 
            this.options.welcome_modal_image        = '';  
            this.options.subtitles_folder   = 'http://dev.talkingjobs.net/player/subtitles/';    
            this.options.xml_url            = "modules/yssg/";
            //Go! 
            this.options.elem = this.element; 
            this.options.mode = 'whole_interview'; //could also be whole_interview or random or whole_question
            job_player.getData(this.options);
        }
    });
    
}(jQuery,window));



