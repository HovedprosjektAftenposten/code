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
	
	mysql_query("UPDATE media_table SET media_type = 'picture' , media_data = '".$pictureLink."' WHERE content_ID = '".$_REQUEST['article']."' ORDER BY media_ID DESC LIMIT 1");
	}
	
	$query = mysql_query("SELECT media_data FROM media_table WHERE content_ID = '".$_REQUEST['article']."'");
	$print = mysql_fetch_array($query);
	
	echo "<img src='".$print[0]."'></img>";
	
?>