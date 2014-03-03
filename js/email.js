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
    job_player.sendEmail(text, target, 'Your Talking Jobs reflections', '.favs_alert');  
}

job_player.downloadReflections = function(options){ 
    var text = job_player.generateReflectionsText(options);
    job_player.makePDF(text, '.reflections_alert');
}


job_player.generateFavsText = function(options) { 
    var name = $('.favs_name').val();
    var text  = "<strong>favourites</strong>";
        text += "<p>Name: " + name + "</p>";
    
    $('.fav_wrapper').each(function(key,val){
        var title = $('.fav_job_title', val).text();
        var transcript = $('.fav_transcript', val).text();
        var notes = $('textarea', val).val();
        text += "<h3>"+ title+"</h3><strong>Transcript<p>" +transcript+ "</p>"; 
        if(notes){ 
            text +="<strong>Notes</strong><p>" + notes + "</p>";
        }
    });
    return text;
}

job_player.emailFavourites = function(options){     
    var target = $('.favs_email').val();
    var text = job_player.generateFavsText(options); 
    job_player.sendEmail(text, target, 'Your Talking Jobs favourties', '.favs_alert');
}

job_player.downloadFavs = function(options){ 
    var text = job_player.generateFavsText(options);
    job_player.makePDF(text, '.favs_alert');
}



job_player.emailQuestion = function(options){ 
    var question_note  = $('.question_note', options.elem).val();
    var text = "<strong>A question from Talking Jobs</strong>";
    text    += "<p>" + question_note + "</p>";    
    job_player.sendEmail(text, address, 'Question via Talking Jobs', '.question_alert');
}




job_player.sendEmail = function(text, address, subject, alert_field) { 
    
    if(!job_player.validateEmail(email)) { 
        $(alert_field).show();
         $(alert_field).html('You must fill out a valid email adderss');

         setTimeout(function(){
                $(alert_field, options.elem).fadeOut(400, function(){
                    $(alert_field, options.elem).html('');
                });
            }, 2000);
        return 
    }
    
    var url = 'http://dev.talkingjobs.net/yst/playerFunctions.cfc'; 
    
    var data = { 
         method: 'sendEmail',
         subject: subject,
         toAddress: address,
         emailContent: text   
     }

    $.post(url, data, function(arg1, arg2){ 
        $(alert_field).show();
        $(alert_field).html('Email sent');

        setTimeout(function(){
               $(alert_field, options.elem).fadeOut(400, function(){
                   $(alert_field, options.elem).html('');
               });
           }, 2000);
    });   
}

job_player.makePDF = function(text, alert_field) { 
    var url = 'http://dev.talkingjobs.net/yst/playerFunctions.cfc'; 
    
    var data = { 
        method: 'html5PDF',
        pdfContent: text
    }

    $.post(url, data, function(arg1, arg2){ 
        console.log(arg1);
        var url = arg1.split('<string>')[1];
        url = url.split('</string>')[0];
        $(alert_field).show();
        $(alert_field).html('<a target="_blank" href="'+url+'">Download</a>');
    });
}

job_player.validateEmail = function(email) { 
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);    
}

