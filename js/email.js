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