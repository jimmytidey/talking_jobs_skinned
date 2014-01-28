job_player.tabs = function(options) {
    $('.tab_buttons a', options.elem).click(function(){
        var target_tab = $(this).attr('href').substring(1);
        $('.tab', options.elem).hide();
        $('.tab_'+ target_tab, options.elem).show();
    });
    
}