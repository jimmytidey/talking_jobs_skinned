job_player.favourites = function(options){
    $.cookie.json = true;
    
    
    $('.add_video_btn', options.elem).click(function(){
        var current_item = options.playlist_position;
        
        var current_favs = $.cookie('tj_favourites');
        
        if($.inArray(current_favs) === -1) {
            job_player.addFavourite(current_item, options)
        }
        
        var playlist_item  = options.playlist[current_item];
        var question_no    = parseInt(playlist_item.question_id) +1;
        $('.favourites_tab_alert', options.elem).empty();
        $('.favourites_tab_alert', options.elem).show();
        $('.favourites_tab_alert', options.elem).append('Q.' + question_no );
        
        setTimeout(function(){
            $('.favourites_tab_alert', options.elem).fadeOut(400, function(){
                $('.favourites_tab_alert', options.elem).html('');
            });
        }, 2000);
    });
}

job_player.addFavourite = function(id, options) { 
    //save the item 
    var current_favs = $.cookie('tj_favourites');
    
    if(!current_favs){
        current_favs = [];
    }
    
    var subtitles_url = options.playlist[id].subtitles_url;
    
    cookie_obj = {
        playlist_id: id, 
        notes: '',
        transcript:''
    }
    
    $.ajax({
        type: "GET",
        url: subtitles_url,
        dataType: 'text'
    }).done(function(xml){
    
        var x2js = new X2JS();    
        var json = x2js.xml_str2json(xml);
        
        var transcription ='';
        for(var i=0; i < json.tt.body.div.p.length; i++){
            transcription += '<p>' + json.tt.body.div.p[i]["__text"] + "</p>";
        }   
        cookie_obj.transcript = transcription;
        
        current_favs.push(cookie_obj);
        $.cookie('tj_favourites',current_favs);
        job_player.renderFavourites(options);    
    });

}


job_player.renderFavourites = function(options) { 
    var current_favs = eval($.cookie('tj_favourites'));
    
    if(!current_favs) {
        return false
    }
    
    $('.fav_container').html('');
    
    for (var i=0; i < current_favs.length; i++) {
        var val = current_favs[i];
        var item = options.playlist[val.playlist_id];
        
        var question_number_string =  parseInt(item.question_id) + 1;
        
        var html = "<div data-id='" + i + "' class='fav_wrapper'>";
			html    += "<a href ='' class='fav_play'>Play</a>";
			html    += "<a href ='' class='fav_delete btn_red'>Delete</a>";
			html    += "<div class='content'>";
	           html    += "<p><span class='fav_job_title'>"+item.job_title+"</span></p>";
	           html    += "<p class='cf question_holder'> <span class='fav_question_number'>Q" + question_number_string + "</span><span class='fav_question'>" + item.question + "</span></p>";
				html    += "<p class='view_transcript'>View transcript and notes</p>";
	           html    += "<div class='notes_and_transcript hide cf'>";
	               html    += "<p class='notes_title'><strong>Transcript</strong></p>";
	               html    += "<div class='fav_transcript'>" + val.transcript + "</div>";
					html    += "<button data-id='" + i + "' class='btn save_fav_notes'>Copy to clipboard</button>";
					html    += "<p class='notes_title'><strong>My notes</strong></p>";
	               html    += "<textarea>"+current_favs[i].notes+"</textarea>";
	               html    += "<button data-id='" + i + "' class='btn save_fav_notes'>Copy to clipboard</button>";
	           html    += "</div>";
			html    += "</div>";
        html    += '</div>';
        
        
        $('.fav_container').append(html);
    };  
    
    //attach events 
    $('.view_transcript').unbind();
    $('.view_transcript').click(function(){
        $(this).next().slideToggle();
    });
    
    $('.save_fav_notes').click(function(){
        var note = $(this).prev().val();
        var id   = $(this).attr('data-id');
        var current_favs = eval($.cookie('tj_favourites'));
        current_favs[id].notes = note;
        $.cookie('tj_favourites',current_favs);
    });
    
    $('.fav_delete').click(function(){
        var id   = $(this).parent().attr('data-id');
        console.log(id);
        var current_favs = eval($.cookie('tj_favourites'));
        current_favs.splice(id,1);
        $.cookie('tj_favourites',current_favs);
        $(this).parent().remove();
    });
    
    
    
}







