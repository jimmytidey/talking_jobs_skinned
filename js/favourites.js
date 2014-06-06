job_player.favourites = function(options){
    $.cookie.json = true;
    
    $('.add_video_btn', options.elem).unbind();
    $('.add_video_btn', options.elem).click(function(){
        var current_item = options.playlist_position;
        
        var current_favs = $.cookie('tj_favourites');
        
        job_player.addFavourite(current_item, options)
        
        if(typeof current_favs === 'undefined') { 
            var number_of_favs=0; 
        }
        else { 
            var number_of_favs =current_favs.length; 
        }
         
        var playlist_item  = options.playlist[current_item];
        var question_no    = parseInt(playlist_item.question_id) +1;
        $('.favourites_tab_alert', options.elem).empty();
        
        $('.favourites_tab_alert').html(number_of_favs+1);
        $('.favourites_tab_alert', options.elem).show();
        $('.favourites_tab_alert', options.elem).append();
        
        setTimeout(function(){
            $('.favourites_tab_alert', options.elem).fadeOut(400, function(){
                $('.favourites_tab_alert', options.elem).html('');
            });
        }, 2000);
    });
}

job_player.getTranscript = function(elem, subtitles_url) { 
    
    $.ajax({
        type: "GET",
        url: subtitles_url,
        dataType: 'text'
    }).done(function(xml,i){
        var x2js = new X2JS();    
        var json = x2js.xml_str2json(xml);
        
        var transcription =''; 
        
        for(var j=0; j < json.tt.body.div.p.length; j++){
            transcription += '<p>' + json.tt.body.div.p[j]["__text"] + "</p>";
        }
        $(elem).append(transcription);
    }); 

}

job_player.addFavourite = function(id, options) { 
    
    //save the item 
    var current_favs = $.cookie('tj_favourites');
    
    if(!current_favs){
        current_favs = [];
    }
    
    
    
    cookie_obj = {
        playlist_id: id, 
        notes: '',
        transcript:''
    }
    

    
    current_favs.push(cookie_obj);
    
    $.cookie('tj_favourites',current_favs);
    job_player.renderFavourites(options);    

    

}


job_player.renderFavourites = function(options) { 
    var player_instance  = options;

    var current_favs = eval($.cookie('tj_favourites'));
    
    if(!current_favs) {
        var message = "Use the '+' button on the player screen to select your favourite clips. Once done transcripts of these clips will be shown here for you to make notes against.";
        $('.fav_container ul').html("<li>" + message + "</li>");
        return false
    }
    
    $('.fav_container ul').html('');
    

    
    for (var i=0; i < current_favs.length; i++) {
        var val = current_favs[i];
        var item = options.playlist[val.playlist_id];
        
        var question_number_string =  parseInt(item.question_id) + 1;
        var subtitles_url = options.playlist[val.playlist_id].subtitles_url;
        
        var item =options.playlist[val.playlist_id];
    
        var html = "<li data-id='" + i + "' data-playlist-id="+ val.playlist_id +"  class='fav_wrapper'>";
			html    += "<a  class='fav_play'>Play</a>";
			html    += "<div class='fav_delete btn_red'>Delete</div>";
		
			html    += "<div class='content'>";
	           html    += "<p><span class='fav_job_title'>"+item.job_title+"</span></p>";
	           html    += "<p class='cf question_holder'> <span class='fav_question_number'>Q" + question_number_string + "</span><span class='fav_question'>" + item.question + "</span></p>";
				html    += "<p class='view_transcript'>View transcript and notes</p>";
	           html    += "<div class='notes_and_transcript hide cf'>";
	               html    += "<p class='notes_title'><strong>Transcript</strong></p>";
	                html    += "<div class='fav_transcript'></div>";
					//html    += "<button data-id='" + i + "' class='btn save_fav_notes'>Copy to clipboard</button>";
					html    += "<p class='notes_title'><strong>My notes</strong></p>";
	                html    += "<textarea>"+val.notes+"</textarea>";
	               //html    += "<button data-id='" + i + "' class='btn save_fav_notes'>Copy to clipboard</button>";
	           html    += "</div>";
			html    += "</div>";
        html    += '</li>';
    
        $('.fav_container ul').append(html);
        
        job_player.getTranscript($('.fav_container ul li[data-id="'+i+'"] .fav_transcript'), subtitles_url);
        
        //attach events once everything is rendered
        if( jQuery('.favs_scroller').length > 0 )
    	{
    	    options.fav_scroll = new IScroll('.favs_scroller', {
    	        scrollbars:true,
    	        mouseWheel:true,
    	        interactiveScrollbars: true
    	    });	
    	}

        //attach events 
        $('.view_transcript').unbind();
        $('.view_transcript').click(function(){
            $(this).next().slideToggle();
        });
        
        
        $('.save_fav_notes').unbind();
        $('.save_fav_notes').click(function(){
            var note = $(this).prev().val();
            var id   = $(this).attr('data-id');
            var current_favs = eval($.cookie('tj_favourites'));
            current_favs[id].notes = note;
            $.cookie('tj_favourites',current_favs);
        });

        $('.fav_delete').unbind();
        $('.fav_delete').click(function(){
            var id   = $(this).parent().attr('data-id');   
            
            var current_favs = eval($.cookie('tj_favourites'));
            current_favs.splice(id,1);
            $.cookie('tj_favourites',current_favs);
            
            $(this).parent().remove();
        });
        
        $('.fav_play').unbind();
        $('.fav_play').click(function(){
            job_player.unsetActiveTab();
             $('.tab').hide();
             $('.tab_player').show();
             $('.player_tab_indicator').addClass("active");
            
            job_player.setNormalMode(options);
            var playlist_id = parseInt($(this).parent().attr('data-playlist-id')); 
           
            job_player.playlistChange(playlist_id, options, true);

            setTimeout(function(){window.player_root.play()}, 100);
            
        });
        
        
        
        
        
    };    
}







