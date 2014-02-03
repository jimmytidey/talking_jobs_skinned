job_player.drawInterface = function(player_instance) {
    
    var local_player_instance = player_instance;
    
    //build the modal 
    job_player.buildModal(player_instance);
    
    //init the tabs 
    job_player.tabs(player_instance);
    
    //Draw any existing favs in 
    job_player.renderFavourites(player_instance);
        
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
        $(scroller).append("<li class='question_selector question_type_"+ type +" cf' data-id='"+ id + "' > <span class='number'>Q" + question_number + ".</span>   <span class='question'>" + player_instance.questions[i]['__cdata'] + "</span> </li>");
        
        if (i === player_instance.questions.length-1 && $('html.lt-ie9').length==0) {
            player_instance.myScroll = new IScroll('.scroller_wrapper',{
                scrollbars:true,
                mouseWheel:true,
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
    job_player.attachEvents(player_instance);
    
};

job_player.clearModeButtons = function() { 
    $('.flow_controls p').removeClass('active');
}