if (!Array.prototype.indexOf)
{
  Array.prototype.indexOf = function(elt /*, from*/)
  {
    var len = this.length >>> 0;

    var from = Number(arguments[1]) || 0;
    from = (from < 0)
         ? Math.ceil(from)
         : Math.floor(from);
    if (from < 0)
      from += len;

    for (; from < len; from++)
    {
      if (from in this &&
          this[from] === elt)
        return from;
    }
    return -1;
  };
}


job_player.getObjectFromPlaylist = function(interviewee_no, question_no, player_instance){ 
    //find the next playlist item with question ID 
    var result;
    
    for(var i=0; i < player_instance.playlist.length; i++) {

        if (question_no === parseInt(player_instance.playlist[i].question_id) &&
            interviewee_no === parseInt(player_instance.playlist[i].interviewee_id)) { 
                result = (player_instance.playlist[i]);
        }
    }
    
    if(result) {
        return(result);
    }
    else { 
        return(false);
    }

}

//the next two methods should be combined 
job_player.getPlaylistIdByQuestionType = function(interviewee_no, type_no, player_instance) { 
    
    var result;
    
    for(var i=0; i < player_instance.playlist.length; i++) {
       
       interviewee_no   = parseInt(interviewee_no);
       type_no          = parseInt(type_no);
        
        if (type_no === parseInt(player_instance.playlist[i].question_type) &&
            interviewee_no === parseInt(player_instance.playlist[i].interviewee_id)) { 
                result = i
                break;
        }
        
    }
    return(result);    
}

job_player.findPlaylistID = function(interviewee_no, question_no, player_instance) {
    
    var result; 
    interviewee_no = parseInt(interviewee_no);
    question_no = parseInt(question_no)
    
    for(var i=0; i < player_instance.playlist.length; i++) { 
        if (question_no === parseInt(player_instance.playlist[i].question_id) &&
            interviewee_no === parseInt(player_instance.playlist[i].interviewee_id)) { 
                result = i;
        }
    }
    return(result);
}


//functions for ordering the playlist 
job_player.shuffle = function (o){ //v1.0
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

job_player.buildModal = function(player_instance) { 
    var modal = $(".welcome_modal").attr('title', player_instance.welcome_modal_header);
    
    $(".welcome_text").append(player_instance.welcome_modal_text);
    $(".welcome_image").attr('src', player_instance.welcome_modal_image);
    $('.close_window').click(function(){
        $(".welcome_modal").dialog('close');
    });
    
    $('.close_window').click(function(){
        $(".welcome_modal").dialog('close');
    });
    
    $('.random_order').unbind()
    $('.random_order').click(function(){
        job_player.setRandomMode(player_instance);
    });
}

job_player.triggerModal = function(player_instance) { 
    $(".welcome_modal").dialog({
        width: '600px',
        height:'400',
        position: { my: "center top", at: "center top", of: '.span6' } 
    });
}

job_player.detectWidth = function(){ 
    if($(window).width() > 1200) { 
        return 'big'; 
    }
    else { 
        return 'medium';
    }
}

job_player.questionPosition = function(id, player_instance) { 
    var top = $('.question_selector[data-id="'+id+'"]' ).position().top;
    return top;
}

job_player.triggerMoreInfoModal = function(player_instance) {
    var body_text = player_instance.playlist[player_instance.playlist_position].about_training;
    $('.more_info_body').html(body_text);
    
/*
    $('.more_info_modal').dialog({
        width: '400px',
        height:'400',
        position: { my: "center top", at: "center top", of: '.player' } 
    });
*/
}

function isIE() {
  var myNav = navigator.userAgent.toLowerCase();
  return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
}

job_player.isBlackBerry = function() {
	return navigator.userAgent.match(/BlackBerry/i);
}

job_player.isAndroid = function( ) {
	return navigator.userAgent.match(/Android/i);
}

job_player.isIOS = function() {
	return navigator.userAgent.match(/iPhone|iPod|iPad/i);
}

job_player.isWindows = function() {
	return navigator.userAgent.match(/IEMobile/i);
}

job_player.isOpera = function() {
	 return navigator.userAgent.match(/Opera Mini/i);
}

job_player.isMobile = function() {
	 return ( job_player.isAndroid() || job_player.isBlackBerry() || job_player.isIOS() || job_player.isOpera() || job_player.isWindows() );
}


