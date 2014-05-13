//Favs

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

job_player.emailFavs = function(options){
    var target = $('.favs_email').val();
    var text = job_player.generateFavsText(options); 
    var name = $(".favs_name").val(); 
    job_player.sendEmail(text, target, 'Your Talking Jobs favourties [' + name + ']', '.favs_alert', name);
}

job_player.downloadFavs = function(options){ 
    var text = job_player.generateFavsText(options);
    job_player.makePDF(text, '.favs_alert', '.save_favs');
}

job_player.printFavs = function(options){ 
    var text = job_player.generateFavsText(options);
    job_player.makePDF(text, '.favs_alert', '.print_favs');
}

//Reflections
job_player.generateReflectionsText = function(options){
    
    var found_out_note  = $('.found_out_note', options.elem).val();
    var relate_note     = $('.relate_note', options.elem).val();
    var next_steps_note = $('.next_steps_note', options.elem).val();
    
    var name = $('.reflections_name').val();
 
    var text = "<p>Name: " + name + "</p>";
    text += "<strong>What have I just found out?</strong>";
    text += "<p>" + found_out_note + "</p>";
    
    
    text += "<strong>How does this relate to me?</strong>";
    text += "<p>" + relate_note + "</p>";
    
    text += "<strong>What are my next steps?</strong>";
    text += "<p>" + next_steps_note + "</p>";
    return text; 
}


job_player.emailReflections = function(options){ 
    var text    = job_player.generateReflectionsText(options);
    var target  = $('.reflections_email', options.elem).val(); 
    var name    = $(".reflections_name").val();
    job_player.sendEmail(text, target, 'Your Talking Jobs reflections [' + name  + ']', '.reflections_alert', name);  
}

job_player.downloadReflections = function(options){ 
    var text = job_player.generateReflectionsText(options);
    job_player.makePDF(text, '.reflections_alert', '.download_reflections');
}

job_player.printReflections = function(options){ 
    var text = job_player.generateReflectionsText(options);
    job_player.makePDF(text, '.reflections_alert', '.print_reflections');
}


//Questions
job_player.generateQuestionText = function(options) { 
    var question_note  = $('.question_note', options.elem).val();
    var name = $('.question_name').val();
    var text = "<p>Name: " + name + "</p>";
    text += "<strong>A question from Talking Jobs</strong>";
    text    += "<p>" + question_note + "</p>";
    return text;    
}
job_player.emailQuestion = function(options){ 
    var text = job_player.generateQuestionText(options);
    var target = $('.question_email', options.elem).val(); 
    var name = $(".question_name").val()
    job_player.sendEmail(text, target, 'Question via Talking Jobs  [' + name + ']', '.question_alert', name);
}

job_player.downloadQuestion = function(options){ 
    var text = job_player.generateQuestionText(options);
    job_player.makePDF(text, '.question_alert', '.download_question');
}

job_player.printQuestion = function(options){ 
    var text = job_player.generateQuestionText(options);
    job_player.makePDF(text, '.reflections_alert', '.print_question');
}



//Utility functions 
job_player.sendEmail = function(text, address, subject, alert_field, name) { 
    
    if(!job_player.validateEmail(address)) { 
        $(alert_field).show();
        $(alert_field).html('<p class="email_error">Email failed: Please check the email address and try again</p>');
		
         setTimeout(function(){
                $(alert_field).fadeOut(400, function(){
                    $(alert_field).html('');
                });
            }, 2000);
			
        return 
    }
    else if (name === ''){ 
        $(alert_field).show();
        $(alert_field).html('<p class="email_error">Please add your name and try again</p>');
		
         setTimeout(function(){
                $(alert_field).fadeOut(400, function(){
                    $(alert_field).html('');
                });
            }, 2000);
			
        return 
    }
    
    var url = 'playerFunctions.cfc'; 
    
    var data = { 
         method: 'sendEmail',
         subject: subject,
         toAddress: address,
         emailContent: text   
     }
    
   
     
    $.post(url, data, function(arg1, arg2){ 
        $(alert_field).show();
        
		$(alert_field).html('<p class="email_error">Email has been sent to '  + address + '</p>');
		 
        setTimeout(function(){
               $(alert_field).fadeOut(400, function(){
                   $(alert_field).html('');
               });
           }, 2000);
    });   
}

job_player.makePDF = function(text, alert_field, button_field) { 
    
    var url = 'playerFunctions.cfc'; 
    
    var data = { 
        method: 'html5PDF',
        pdfContent: text
    }
    
    var old_txt = $(button_field).val();
    $(button_field).val('wait...');

    $.post(url, data, function(arg1, arg2){
        var url = arg1.split('<string>')[1];
        url = url.split('</string>')[0];
        $(alert_field).show();
        $(button_field).val(old_txt);
        $(alert_field).html('<p class="download"><a target="_blank" href="'+url+'">Download PDF</a></p>');
    });
}

job_player.validateEmail = function(email) { 
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);    
}

