job_player.drawInterface = function(player_instance) {
    
    var local_player_instance = player_instance;
    
    //build the modal 
    job_player.buildModal(player_instance);
    
    //first thing, might as well pop the modal 
    //job_player.triggerModal(player_instance);
    
    //init the tabs 
    job_player.tabs(player_instance);
    
    //Draw any existing favs in 
    job_player.renderFavourites(player_instance);
    
    
    //draw the video player
    var options = {
        alwaysShowControls: true,
        translationSelector: false,
        success: function (media, node, player) {  
           
            $('.mejs-playpause-button').after('<div class="next_track_btn"> &raquo;</div>');
            $('.mejs-playpause-button').after('<div class="prev_track_btn"> &laquo;</div>');
            $('.mejs-playpause-button').after('<div class="restart_video_btn"> &lt;</div>');
            var width = $('.mejs-time-rail').css('width');
            $('.mejs-time-rail').css('width', width -120);
            $('.mejs-time-rail').after('<div class="add_video_btn"> + </div>');

            
            local_player_instance.video = player;
            local_player_instance.media = media;
            //for some reason the mediaElement object isn't properly set in Chrome, so have to rely on this hack
            setTimeout( function(){job_player.attachEvents(local_player_instance); }, 2000 );
        }   
    }
    
    //Old IE cannot play mp4 natively 
    if (isIE()) {  
        options.mode = 'shim';
    }
    
    //Firefox cannot play mp4 natively and must fall back on Flash 
    if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
        options.mode = 'shim';
    }
    
    $('video').mediaelementplayer(options);
    

    
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
        		scroll: { 
        		    easing: 'swing', 
        		    duration: 600,
        		    items: 3
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
    var scroller = $('.question_scroller ul'); 
    
    for(var i = 0; i <player_instance.questions.length; i++){ 
        var type = player_instance.questions[i]['_type'];
        var id   = player_instance.questions[i]['_id'];
        var question_number = parseInt(id) + 1;
        $(scroller).append("<p  class='question_selector question_type_"+ type +" cf' data-id='"+ id + "' > <span class='number'>Q" + question_number + ".</span>   <span class='question'>" + player_instance.questions[i]['__cdata'] + "</span> </p>");
        
        if (i === player_instance.questions.length-1 && !isIE()) {
            myScroll = new IScroll('.question_scroller',{
                scrollbars:true,
                mouseWheel:true
            });
            document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
        }
    };    


    //now add the question type 
    var element = $('.question_types'); 
    
    for(var i = 0; i <player_instance.question_types.length; i++){ 
        var colour = player_instance.question_types[i]['_colour']; 
        colour = "#" + colour.substr(2); 
        $(element).append("<p  class='question_type span2 btn' data-type='"+i+"' style='background-color:" + colour + "; background-image:linear-gradient(to bottom, #FFFFFF, "+colour+")' ><span>" + player_instance.question_types[i]['_label'] + "</span></p>");
        $(".question_type_"+ i).css('background-color', colour);
    };
    var number_of_questions =  player_instance.questions.length + 1;
     
    //make sure the player is in the correct mode
    job_player.initModes(player_instance); 
     
    
};

job_player.clearModeButtons = function() { 
    $('.flow_controls p').removeClass('active');
}