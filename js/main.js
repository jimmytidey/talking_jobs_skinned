

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
            this.options.subtitles_folder           = 'modules/yssg/subtitles/';    
            this.options.elem               = this.element; 
            this.options.mode               = 'normal'; //could also be whole_interview or random or whole_question 
            this.options.current_module     = 'yssg';
            this.options.image_prefix       = "https://s3-eu-west-1.amazonaws.com/gloucestershire/Grabs/";
            this.options.video_prefix       = "https://s3-eu-west-1.amazonaws.com/gloucestershire/";
            this.options.xml_url            = "modules/yssg/";
            //populate the data structure 
            job_player.getData(this.options);
        }
    });
    
}(jQuery,window));



