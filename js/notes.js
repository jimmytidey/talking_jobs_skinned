job_player.notes = function(options){ 
    $.cookie.json = true;
    var obj = $.cookie('tj_notes');
    if(obj) {
        $('.next_steps_note').val(obj.next_steps_note);
        $('.relate_note').val(obj.relate_note);
        $('.found_out_note').val(obj.found_out_note);
    }
    
    $('.save_notes').click(function(){
        var next_steps_note = $('.next_steps_note').val();
        var relate_note     = $('.relate_note').val();
        var found_out_note  = $('.found_out_note').val();
        var obj = {
            next_steps_note : next_steps_note,
            relate_note : relate_note,
            found_out_note : found_out_note 
        }
        $.cookie('tj_notes', obj);
    });   
}