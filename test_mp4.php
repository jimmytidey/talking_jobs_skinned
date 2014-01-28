<!DOCTYPE html>
<html lang="en">
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
    <head>
        <meta charset="utf-8">
        
        <title>Talking Jobs</title>
        <meta name="description" content="">
    
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        
        <link rel="stylesheet" href="css/bootstrap.min.css">
        <link rel="stylesheet" href="css/bootstrap-responsive.min.css"  >
        <link rel="stylesheet" href="css/main.css">
        <link rel="stylesheet" href="media_elements/build/mediaelementplayer.css">
        <script src="js/vendor/modernizr-2.6.2-respond-1.1.0.min.js"></script>
       
    </head>
    <body>
        
        <div class='container '>
            <div class='row'>
                <br/>
                 <div class='span6 offset3' >
                    <video id='video_player' width="640" height="360" style="width: 100%; height: 100%;"  src="https://s3-eu-west-1.amazonaws.com/gloucestershire/test_video/test_1.mp4?<?=time() ?>" class='video_player' controls="controls">

                    </video>
                 </div>
            </div>   
         
            <div class='row'>
                <div class='span6 offset3'>
                    <br/>
                    <input type='button'  class='span6 load'  value='load another video' />  
                </div>
            </div>
            
        </div>
        


        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js"></script>
        <script>window.jQuery || document.write('<script src="js/vendor/jquery-1.10.1.min.js"><\/script>')</script>

        <script src="js/vendor/bootstrap.min.js"></script>
        <script src='media_elements/build/mediaelement-and-player.min.js' ></script>

        <script>
            
            $(document).ready(function() { 
                
                //draw the video player
                var options = {
                    alwaysShowControls: true,
                    success: function (mediaElement, domObject) {                
                        $('.mejs-playpause-button').after('<div class="next_track_btn"> &raquo;</div>');
                        $('.mejs-playpause-button').after('<div class="prev_track_btn"> &laquo;</div>');
                        $('.mejs-playpause-button').after('<div class="restart_video_btn"> &lt;</div>');
                        var width = $('.mejs-time-rail').css('width');
                        $('.mejs-time-rail').css('width', width -90);

                    }   
                }

                //Old IE cannot play mp4 natively 
                if ($('html').is('.ie6, .ie7, .ie8')) {
                    options.mode = 'shim';
                }

                //Firefox cannot play mp4 natively and must fall back on Flash 
                if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
                    options.mode = 'shim';
                }

                window.player = new MediaElementPlayer('#video_player', options);
                
                

                $('.load').click(function(){ 
                    console.log('changing');              
                    var src = 'https://s3-eu-west-1.amazonaws.com/gloucestershire/test_video/test_2.mp4?<?=time() ?>';
                    window.player.pause();
                    window.player.setSrc(src);
                    window.player.play();
                });

            });    

                
            
        </script>

        <script>
            var _gaq=[['_setAccount','UA-XXXXX-X'],['_trackPageview']];
            (function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
            g.src='//www.google-analytics.com/ga.js';
            s.parentNode.insertBefore(g,s)}(document,'script'));
        </script>
    </body>
</html>