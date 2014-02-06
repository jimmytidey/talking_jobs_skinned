job_player.generateReflectionsText = function(options){
    
    var found_out_note  = $('.found_out_note', options.elem).val();
    var relate_note     = $('.relate_note', options.elem).val();
    var next_steps_note = $('.next_steps_note', options.elem).val();
    var text = "<strong>What have I just found out?</strong>";
    text += "<p>" + found_out_note + "</p>";
    
    text += "<strong>How does this relate to me?</strong>";
    text += "<p>" + relate_note + "</p>";
    
    text += "<strong>What are my next steps?</strong>";
    text += "<p>" + next_steps_note + "</p>";
    return text; 
}


job_player.emailReflections = function(options){ 
    
    var text = job_player.generateReflectionsText(options);
    
    var target = $('.reflections_email', options.elem).val(); 
    var url = 'http://dev.talkingjobs.net/yst/playerFunctions.cfc'; 
    
    var data = { 
        method: 'sendEmail',
        subject: 'Your Talking Jobs reflections',
        toAddress: target,
        emailContent: text   
    }

    $.post(url, data, function(arg1, arg2){ 
        
        $('.reflections_alert').html('Email sent');
        
        setTimeout(function(){
               $('.reflections_alert', options.elem).fadeOut(400, function(){
                   $('.reflections_alert', options.elem).html('');
               });
           }, 2000);
    });    
}

job_player.downloadReflections = function(options){ 
    
    var text = job_player.generateReflectionsText(options);
    
    var target = $('.reflections_email', options.elem).val(); 
    var url = 'http://dev.talkingjobs.net/yst/playerFunctions.cfc'; 
    
    var data = { 
        method: 'html5PDF',
        pdfContent: text
    }

    $.post(url, data, function(arg1, arg2){ 
        console.log(arg1);
        var url = arg1.split('<string>')[1];
        url = url.split('</string>')[0];
        
        $('.reflections_alert').html('<a target="_blank" href="'+url+'">Download</a>');
    });    
}


job_player.generateFavsText = function(options) { 
    var text  = "<strong>Your favourites</strong>";
    
    $('.fav_wrapper').each(function(key,val){
        var title = $('.fav_job_title', val).text();
        var transcript = $('.fav_transcript', val).text();
        var notes = $('textarea', val).val();
        //text += "<h3>"+ title+"</h3><strong>Transcript<p>" +transcript+ "</p>"; 
        if(notes){ 
            text +="<strong>Notes</strong><p>" + notes + "</p>";
        }
    });
}

job_player.emailFavourites = function(options){ 

    var text = job_player.generateFavsText(options); 
    
    var target = $('.favs_email', options.elem).val(); 
    var url = 'http://dev.talkingjobs.net/yst/playerFunctions.cfc?method=sendEmail&subject=Your Talking Jobs favourites&toAddress='; 
        url += encodeURIComponent(target) + "&emailContent=";
        url += encodeURIComponent(text)+"&callback=?"; 

    $.ajax({
        dataType: "json",
        url: url, 
        error:function(e){
           
            $('.tab_favourites').append('<div class="question_sent">Your favourites have been sent</div>');        
            setTimeout(function(){
                $('.question_sent').fadeOut(400, function(){
                    $('.question_sent').remove();
                });
            }, 2000);
        }    
    }); 
}

job_player.emailQuestion = function(options){ 
    var question_note  = $('.question_note', options.elem).val();
    
    var text = "<strong>A question from Talking Jobs</strong>";
    text += "<p>" + question_note + "</p>";
    
    var url = 'http://dev.talkingjobs.net/yst/playerFunctions.cfc?method=sendEmail&subject=Question from Talking Jobs website&toAddress='; 
        url += "jimmytidey@gmail.com&emailContent=";
        url += encodeURIComponent(text); 
        
    $.ajax({
        dataType: "json",
        url: url, 
        error:function(){
            $('.tab_have_a_quesiton').append('<div class="question_sent">Your question has been sent</div>');        
            setTimeout(function(){
                $('.question_sent').fadeOut(400, function(){
                    $('.question_sent').remove();
                });
            }, 2000);
        }    
    }); 
    
}