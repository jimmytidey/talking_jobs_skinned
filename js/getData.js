
window.job_player = {};

job_player.getData = function(player_instance) { 
    
	
    var counter = 0; 
    
    $.ajax({
        type: "GET",
        url: player_instance.xml_url + "interviews.xml",
        dataType: 'text'
    }).done(function(xml){
        var x2js = new X2JS();    
        var json = x2js.xml_str2json(xml);
        player_instance.interviews_json = json;
        counter ++;
        initDataStructure();
    });
     
    $.ajax({
        type: "GET",
        url: player_instance.xml_url + "questions.xml",
        dataType: 'text'
    }).done(function(xml){
        var x2js = new X2JS();    
        var json = x2js.xml_str2json(xml);
        player_instance.questions_json = json;
         counter ++;
         initDataStructure();
    });
    
    initDataStructure = function() {
        if(counter > 1) {  
            job_player.buildDataStructure(player_instance); 
        }
    }
    
}

