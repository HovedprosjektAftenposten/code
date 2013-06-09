<?php
	// Script that gets escenic picture URL + adds ALTERNATES and cropversion to URL
	// &&
	// Delete picture from article
	// &&
	// Prints picture and picture text to edit.php

	// connectionstring start
	$connect = mysql_connect("localhost", "root", "root");
			if (!$connect) {
				die('Could not connect: ' . mysql_error()); 
			}
		mysql_select_db("aftenposten", $connect); 
	// connectionstring end
	
	// gets picture URL
	if(!empty($_REQUEST['picEscenicID'])){
		$picture = $_REQUEST['hiddenURL'];
		
		// replace start
		$existing = "{snd:mode}";
		$new = "ALTERNATES";
		
		$pictureNew = str_replace($existing, $new, $picture);
		
		$existingCropVersion = "{snd:cropversion}";
		$newCropVersion = $_REQUEST['cropVersion'];
		
		$pictureLink = str_replace($existingCropVersion, $newCropVersion, $pictureNew);
		// replace end
		
		// increment media ID in media_table by 1
		$mediaID = mysql_query("SELECT * FROM media_table ORDER BY media_ID DESC LIMIT 1");
		
		$array = mysql_fetch_array($mediaID);
		
		$newMediaID = ++$array['media_ID'];
		
		
		mysql_query("INSERT INTO media_table (media_ID, content_ID, media_type, media_title, media_data, media_text)VALUES ('".$newMediaID."','".$_REQUEST['article']."','picture','','".$pictureLink."','')");
		mysql_query("UPDATE content_table SET content_media= '1' WHERE content_ID = '".$_REQUEST['article']."'");
	/* mysql_query("UPDATE media_table SET media_type = 'picture' , media_data = '".$pictureLink."' WHERE content_ID = '".$_REQUEST['article']."' ORDER BY media_ID DESC LIMIT 1"); */
	}
	
	// delete picture
	if(isset($_REQUEST['selectedID'])) {
		mysql_query("DELETE FROM media_table WHERE media_ID = '".$_REQUEST['selectedID']."'");
	}
	
	$query = mysql_query("SELECT * FROM media_table WHERE content_ID = '".$_REQUEST['article']."' AND media_type = 'picture'");
	
	
	// print picture and picture text
	while($print = mysql_fetch_array($query)) {
		echo "<div class='pictureDivider'></div>
				<div class='nu-timeline-cms-showPictures' mediaid='".$print['media_ID']."'><img src='".$print['media_data']."' id='".$print['media_ID']."' />
				<div class='nu-timeline-cms-deletePicture' id='".$print['media_ID']."'></div>
				<div class='nu-timeline-cms-pictureText'><textarea class='nu-timeline-cms-pictureTextArea' placeholder='Bildetekst' rows='7' cols='26' mediaid='".$print['media_ID']."'>".$print['media_text']."</textarea></div>
				
			</div>";
		
	}
	
?>