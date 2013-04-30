<?php
	$connect = mysql_connect("localhost", "root", "root"); //kobler til server (server, brukernavn, passord)
			if (!$connect) {
				die('Could not connect: ' . mysql_error()); //hvis tilkoblingen ikke blir gjennomført blir det feilmelding
			}
		mysql_select_db("aftenposten", $connect); //velger database/schema
		
	
		
	if(!empty($_REQUEST['escenicID'])){
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
	
	$query = mysql_query("SELECT media_data FROM media_table WHERE content_ID = '".$_REQUEST['article']."'");
	
	
	
	while($print = mysql_fetch_array($query)) {
		echo "<img src='".$print['media_data']."'></img>";
		
	}
	
?>