
<?php include 'header.php'  ?>

<div class="welcome_modal row" >

	<div class='row header cf'>
		<div  class="span12">
			<div class="span6">
				<img src='img/tj_welcome_logo.png' alt='Talking Jobs' />
			</div>
			<div class="span6 partners">
				<p>In collaboration with:</p>
				<div>
					<img src='img/yssg_logo.png' alt='Youth Support Team' />
				</div>
			</div>
		</div>
	</div>
	<div class='row cf'>
		<div class='span12'>
			<div class="span6">
				<h2>The Gloucestershire Module</h2>
			    <p class='welcome_text'></p>
			    <div class='modal_controls'>
			        <input type="checkbox" id="israndom"  />
					<label for="israndom">mix it up</label>
			        <span class='btn start btn-danger'>Start</span>
			    </div>
			</div>
			<div class="span6 hero">
				<img src=''class='welcome_image' />
			</div>
		</div>

	</div>
</div>






<div class='container jobs_player'>
    
    <div id="app" class='row'>        
        <div id="player" class='span9'>
            <div class='tab tab_player' >
                <?php include('player.php') ?>
            </div>
            
            <div class='tab tab_favourites'>
                <h1>Favourites</h1>
				<div class="export fav_export cf">
					<form action="">
					<fieldset>
						<label>Your email</label>
						<input type="text" class='favs_email' />
						<input type="button" class="btn email_favs" value="Email">
						<input type="button" class="btn save_favs" value="Download">
					</fieldset>

					</form>
					<div class='favs_alert' ></div>
				</div>
				<div class="identify cf">
					<p class="notice">If you want to print this information we recommend you add your name, so you can identify it when it comes out of the printer.</p>
					<form action="">
					<fieldset>
						<label>Your name</label>
						<input type="text" class='reflections_name' />
					</fieldset>
					</form>
				</div>
                <div class='fav_container content-container'>
                
                </div>
            </div>
            
            <div class='tab tab_reflections'>
            <h1>Reflections</h1>
			<div class="export reflect_export">
				<form action="">
				<fieldset>
					<label>Your email</label>
					<input type="text" class='favs_email' />
					<input type="button" class="btn email_favs" value="Email">
					<input type="button" class="btn save_favs" value="Download">
				</fieldset>

				
				</form>
				<div class='reflections_alert' ></div>
			</div>
			<div class="identify cf">
				<p class="notice">If you want to print this information we recommend you add your name, so you can identify it when it comes out of the printer.</p>
				<form action="">
				<fieldset>
					<label>Your name</label>
					<input type="text" class='reflections_name' />
				</fieldset>
				</form>
			</div>
			<div class='content-container'>
                <p>What have I just found out?</p>
                <textarea class='found_out_note'></textarea>
               
                <p>How does this relate to me?</p>
                <textarea class='relate_note'></textarea>
               
                <p>What are my next steps?</p>
                <textarea class='next_steps_note'></textarea>

			</div>
            </div>
            
            <div class='tab tab_about'>
                <h1>About</h1>
				<div class='content-container'>
				</div>
            </div>
            
            <div class='tab tab_activities'>
                <h1>Activities</h1>
				<div class='content-container'>
				</div>
            </div>
            
            <div class='tab tab_have_a_quesiton'>
                <h1>Ask a question</h1>
				<div class='content-container'>
				    <p>Write your question</p>
				    <input type='text' class='question_target' placeholder='Send to (email address)' />
	                <textarea class='question_note'></textarea>
	                <button class="btn email_question">Email</button>
	                <div class='question_alert' ></div>
				</div>
            </div>
            
        </div>
        
        <div id="tabs" class='span3'>
            <nav>
                <ul class="nav nav-pills nav-stacked tab_buttons ">
                    <li class="active"><a href="#player">Player</a></li>
                    <li><a href="#favourites" >Favourites <span class='favourites_tab_alert'></span></a></li>
                    <li><a href="#reflections">Reflections</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#activities">Activities</a></li> 
                    <li><a href="#have_a_quesiton">Ask a question</a></li>                        
                </ul>
            </nav>


        </div>
        
    </div>    
	<div id="branding">
        <img class='' src='img/powered_by.png' alt='Powered by Talking jobs' />
    </div>
</div> <!-- /container -->        

<br /><br />

<?php include 'footer.php'  ?>        

