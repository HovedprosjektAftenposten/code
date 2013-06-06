<?php
	$connect = mysql_connect("localhost", "root", "root"); //kobler til server (server, brukernavn, passord)
			if (!$connect) {
				die('Could not connect: ' . mysql_error()); //hvis tilkoblingen ikke blir gjennomført blir det feilmelding
			}
		mysql_select_db("aftenposten", $connect); //velger database/schema
		
	
		
	if(!empty($_REQUEST['picEscenicID'])){
		$picture = $_REQUEST['hiddenURL'];
		
		$existing = "{snd:mode}";
		$new = "ALTERNATES";
		
		$pictureNew = str_replace($existing, $new, $picture);
		
		$existingCropVersion = "{snd:cropversion}";
		$newCropVersion = $_REQUEST['cropVersion'];
		
		$pictureLink = str_replace($existingCropVersion, $newCropVersion, $pictureNew);
		
		$mediaID = mysql_query("SELECT * FROM media_table ORDER BY media_ID DESC LIMIT 1");
		
		$array = mysql_fetch_array($mediaID);
		
		$newMediaID = ++$array['media_ID'];
		
		
		mysql_query("INSERT INTO media_table (media_ID, content_ID, media_type, media_title, media_data, media_text)VALUES ('".$newMediaID."','".$_REQUEST['article']."','picture','','".$pictureLink."','')");
	
	/* mysql_query("UPDATE media_table SET media_type = 'picture' , media_data = '".$pictureLink."' WHERE content_ID = '".$_REQUEST['article']."' ORDER BY media_ID DESC LIMIT 1"); */
	}
	
	if(isset($_REQUEST['selectedID'])) {
		mysql_query("DELETE FROM media_table WHERE media_ID = '".$_REQUEST['selectedID']."'");
	}
	
	$query = mysql_query("SELECT * FROM media_table WHERE content_ID = '".$_REQUEST['article']."' AND media_type = 'picture'");
	
	
	
	while($print = mysql_fetch_array($query)) {
		echo "<div class='nu-timeline-cms-showPictures' mediaid='".$print['media_ID']."'><img src='".$print['media_data']."' id='".$print['media_ID']."' />
				<div class='nu-timeline-cms-deletePicture' id='".$print['media_ID']."'></div>
				<div class='nu-timeline-cms-pictureText'><textarea class='nu-timeline-cms-pictureTextArea' placeholder='Bildetekst' rows='7' cols='26' mediaid='".$print['media_ID']."'>".$print['media_text']."</textarea></div>
				
			</div>
			<div class='pictureDivider'></div>";
	}
	
?>