<?php
		$connect = mysql_connect("localhost", "root", "root"); //kobler til server (server, brukernavn, passord)
			if (!$connect) {
				die('Could not connect: ' . mysql_error()); //hvis tilkoblingen ikke blir gjennomført blir det feilmelding
			}
		mysql_select_db("aftenposten", $connect); //velger database/schema
	
		$query = mysql_query("SELECT * FROM media_table WHERE content_ID = '".$_REQUEST['article']."' AND media_type = 'map'");
		
		$print = mysql_fetch_array($query);
		
		$mediaID = mysql_query("SELECT * FROM media_table ORDER BY media_ID DESC LIMIT 1");
	
		$array = mysql_fetch_array($mediaID);
	
		$newMediaID = ++$array['media_ID'];
		
		if(!empty($print['media_data'])){
			echo $print['media_data'];
		}else{
			echo "59.9138688,10.752245399999993,9";
		}
		
		if(!empty($_REQUEST['coords'])){
			if($print['media_type'] == "map"){
				mysql_query("UPDATE media_table SET media_data='".$_REQUEST['coords']."' WHERE content_ID = '".$_REQUEST['article']."' AND media_type = 'map'");
			}else {
				mysql_query("INSERT INTO media_table (media_ID, content_ID, media_type, media_title, media_data, media_text) VALUES ('".$newMediaID."', '".$_REQUEST['article']."', 'map', '', '".$_REQUEST['coords']."', '')");
			}
		}
?>