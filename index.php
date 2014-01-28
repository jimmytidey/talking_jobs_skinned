
<? include 'header.php'  ?>

<div class="welcome_modal row" title="The Gloucestershire Module">

	<div class='row header cf'>
		<div id="" class="span12">
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
			        <input type="checkbox" id="israndom" checked />
					<label for="israndom">Automatic playback</label>
			        <a href="" class='btn start btn-danger'>Start</a>
			    </div>
			</div>
			<div class="span6 hero">
				<img src='https://s3-eu-west-1.amazonaws.com/gloucestershire/Grabs/YSSG_Dale.jpg' width="100%" class='welcome_image' />
			</div>
		</div>

	</div>
</div>




<div class='container jobs_player'>
    
    <div id="app" class='row'>


      
        
        <div id="player" class='span9'>
            <div class='tab tab_player' >
                <? include('player.php') ?>
            </div>
            
            <div class='tab tab_favourites'>
                <h1>Favourites</h1>
				<div class="export">
					<form action="">
					<fieldset>
						<label>Your name</label>
						<input type="text" />
					</fieldset>
					<fieldset>
						<label>Filename</label>
						<input type="text" />
					</fieldset>
					<button class="btn">Save</button>
					<button class="btn">Email</button>
					<button class="btn">Print</button>
					</form>
				</div>
                <div class='fav_container content-container'>
                
                </div>
            </div>
            
            <div class='tab tab_reflections'>
                <h1>Reflections</h1>
			<div class="export">
				<form action="">
				<fieldset>
					<label>Your name</label>
					<input type="text" />
				</fieldset>
				<fieldset>
					<label>Filename</label>
					<input type="text" />
				</fieldset>
				<button class="btn">Save</button>
				<button class="btn">Email</button>
				<button class="btn">Print</button>
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
            
        </div>
        
        <div id="tabs" class='span3'>
            <nav>
                <ul class="nav nav-pills nav-stacked tab_buttons ">
                    <li class="active"><a href="#player">Player</a></li>
                    <li><a href="#favourites" >Favourite <span class='favourites_tab_alert'></span></a></li>
                    <li><a href="#reflections">Reflections</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#activities">Activities</a></li>                        
                </ul>
            </nav>


        </div>
        
    </div>    
	<div id="branding">
        <img class='' src='img/powered_by.png' alt='Powered by Talking jobs' />
    </div>
</div> <!-- /container -->        

<br /><br />

<? include 'footer.php'  ?>        

