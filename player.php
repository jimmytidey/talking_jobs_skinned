<!-- top nav -->
<div class='row top_nav '>
	
	<div class="contributor cf">
		<p class=' interviewee_name'></p>
		<a class="camera_button" href="#">Alternate picture</a>
		<div class='  interviewee_select'>
			<select></select>
			<a class="info_button" href="#">information</a>
		</div>
	</div>
	
	<div class="more_info_modal hide" title="More info">
		<a href="" class="close inoformation panel">close</a>
		<h2>More information</h2>
	    <div class='more_info_body'></div>
	</div>
	
	<div class='flow_controls'>

		<div class='modes span6  btn-group'>
			<p class='btn random_order'>Mix it up</p>
	        <p class='btn whole_interview_order'>Play whole interview</p>
	        <p class='btn whole_question_order'>Play all answers to this question</p>
	    </div>
	
		<!--
		<a class="play-mode-interview btn" href="#"><span class="tj-label">Play whole interview</span><i class="tj-icon">icon</i></a>
		<a class="play-mode-shuffle btn" href="#"><span class="tj-label">Mix it up</span><i class="tj-icon">icon</i></a>
		<a href='' class='play-mode-questions btn'><span class='tj-label'>Play all answers</span><i class='tj-icon'>icon</i></a>
		-->
	</div>

		
	 
	

</div>
<!-- end top nav  -->


<!-- player -->
<div class='row player'>
     <div class='span7' >
        <video id='video_player' preload="auto" poster='' type="video/mp4" width="640" height="360" style="width: 100%; height: 100%;"  src="https://s3-eu-west-1.amazonaws.com/gloucestershire/YSSG_Dale_01.mp4?<?=time() ?>" class='video_player' controls="controls">
            <track id='subtitles' kind="subtitles" src="" srclang="en" />
            <object width="640" height="360" type="application/x-shockwave-flash" data="media_elements/build/flashmediaelement.swf">
                <param name="movie" value="media_elements/build/flashmediaelement.swf" />
                <param name="flashvars" value="controls=true&file=https://s3-eu-west-1.amazonaws.com/gloucestershire/YSSG_Dale_01.mp4" />
                <!-- Image as a last resort -->
                
            </object>
        </video>
     </div>

	<a class="previous_button" href="#">Previous contributor</a>
	<a class="next_button" href="#">Next contributor</a>
</div>
<!-- end player -->


<!-- interviewee_scroller -->

<div class='row carousel'>
        
		<!-- <img class='carousel_prev carousel_controls'  src='img/skin/btn_carousel_left_arrow.png' />-->
        <a href="" class='carousel_prev carousel_controls' >scroll right</a> 
        
        <div class='carousel_container'>
            <div class='interviewee_scroller'></div>
        </div>
        
		<!--<img class='carousel_next carousel_controls' src='img/skin/btn_carousel_right_arrow.png' /> -->
         <a href="" class='carousel_next carousel_controls'> scroll left</a> 

</div>
<!-- end interviewee_scroller -->

<!-- question_scroller -->
<div class='row question_container'>
    <div class='span2'>
        <div class='question_types row'>
            
        </div>
    </div>

    <div class='span5 question_scroller default-skin'>
        <ul></ul>
    </div>
</div>
<!-- end question_scroller -->


<!-- flow_controls -->

<div class='row flow_controls'>
   
        
       
</div>
<!-- end flow_controls -->

<footer class='row'>
   
</footer>