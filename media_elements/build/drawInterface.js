job_player.drawInterface = function(player_instance) {
    
    var local_player_instance = player_instance;
    
    //build the modal 
    job_player.buildModal(player_instance);
    
    //first thing, might as well pop the modal 
    job_player.triggerModal(player_instance);
    
    //draw the video player
    
    var options = {
        alwaysShowControls: true,
        success: function (mediaElement, domObject) {
        
                $('.mejs-playpause-button').after('<div class="next_track_btn"> &raquo;</div>');
                $('.mejs-playpause-button').after('<div class="prev_track_btn"> &laquo;</div>');
                $('.mejs-playpause-button').after('<div class="restart_video_btn"> &lt;</div>');
                var width = $('.mejs-time-rail').css('width');
                $('.mejs-time-rail').css('width', width -90);
                
                job_player.attachTransportEvents(local_player_instance);

            }
    }
    
    if($.browser.msie && ($.browser.version == '8.0' || $.browser.version == '7.0')) {
        options.mode = 'shim';
    }
    
    local_player_instance.video = new MediaElementPlayer('#video_player', options);
    
    //write the drop down   
    $.each(player_instance.interviewees, function(key, val) {
        var html = "<option value='" + val.id + "'>" + val.interviewee +"</option>";  
        $('.interviewee_select select', this.elem).append(html);
    });
    
    
    //write the interviewee scroller  
    var scroller = $('.interviewee_scroller'); 
    
    for(var i = 0; i <player_instance.interviewees.length; i++){ 
        $(scroller).append("<img rel='tooltip' title='"+ player_instance.interviewees[i].interviewee+"' data-placement='bottom' src='" + player_instance.interviewees[i].now_image + "' class='interviewee_selector ' data-id='"+ player_instance.interviewees[i].id + "' />");
        
        if (i == player_instance.interviewees.length -1) { 
           
            //Draw the carousel     
        	$(".interviewee_scroller").carouFredSel({
        		auto: { 
        		    play: false
        		},
        		prev : { 
        		    button: '.carousel_prev'
        		},
        		next : { 
        		    button: '.carousel_next'
        		}, 
        		swipe: { 
        		    onTouch: true
        		},
        		width:'100%', 
        		align: 'left',
        		height:'70px'			
        	});    
        	
        	//add tooltips 
        	$('.interviewee_selector').tooltip();
        }
    };
    
    //write the question scroller 
    var scroller = $('.question_scroller'); 
    for(var i = 0; i <player_instance.questions.length; i++){ 
        var type = player_instance.questions[i]['_type'];
        var id   = player_instance.questions[i]['_id'];
        $(scroller).append("<p  class='question_selector question_type_"+ type +"' data-id='"+ id + "' >" + player_instance.questions[i]['__cdata'] + "</p>");
    };
    
    
    //now add the question type 
    var element = $('.question_types'); 
    
    for(var i = 0; i <player_instance.question_types.length; i++){ 
        var colour = player_instance.question_types[i]['_colour']; 
        colour = "#" + colour.substr(2); 
        $(element).append("<p  class='question_type span1 btn' data-type='"+i+"' style='background-color:" + colour + "; background-image:linear-gradient(to bottom, #FFFFFF, "+colour+")' >" + player_instance.question_types[i]['_label'] + "</p>");
        $(".question_type_"+ i).css('background-color', colour);
    };

    
    job_player.attachEvents(local_player_instance); 
};