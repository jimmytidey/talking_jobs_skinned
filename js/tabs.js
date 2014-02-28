job_player.tabs = function(options) {
    $('.tab_buttons a', options.elem).click(function(){
		job_player.unsetActiveTab();
        var target_tab = $(this).attr('href').substring(1);
        $('.tab', options.elem).hide();
        $('.tab_'+ target_tab, options.elem).show();
		job_player.setActiveTab( $(this).parent() );
    });
    
}

job_player.unsetActiveTab = function( ) {
    $('#tabs .nav li').removeClass("active");
}

job_player.setActiveTab = function( el ) {
    el.addClass("active");
}