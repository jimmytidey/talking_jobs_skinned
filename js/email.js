job_player.emailReflections = function(options){ 
    var found_out_note  = $('.found_out_note', options.elem).val();
    var relate_note     = $('.relate_note', options.elem).val();
    var next_steps_note = $('.next_steps_note', options.elem).val();
    var text = "<strong>What have I just found out?</strong>";
    text += "<p>" + found_out_note + "</p>";
    
    text += "<strong>How does this relate to me?</strong>";
    text += "<p>" + relate_note + "</p>";
    
    text += "<strong>What are my next steps?</strong>";
    text += "<p>" + next_steps_note + "</p>";
    
    var target = $('.reflections_email', options.elem).val(); 
    var url = 'http://dev.talkingjobs.net/yst/playerFunctions.cfc?method=sendEmail&subject=Your Talking Jobs reflections&toAddress='; 
        url += encodeURIComponent(target) + "&emailContent=";
        url += encodeURIComponent(text)+"&callback=?"; 
        console.log(url);
        
    $.getJSON(url, function(arg1, arg2){ 
        console.log(arg1, arg2);
    }); 
    
}