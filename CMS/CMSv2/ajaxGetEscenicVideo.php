<?php
	$connect = mysql_connect("localhost", "root", "root"); //kobler til server (server, brukernavn, passord)
			if (!$connect) {
				die('Could not connect: ' . mysql_error()); //hvis tilkoblingen ikke blir gjennomført blir det feilmelding
			}
		mysql_select_db("aftenposten", $connect); //velger database/schema
			
	$query = mysql_query("SELECT * FROM media_table WHERE content_ID = '".$_REQUEST['article']."' AND media_type = 'video'");
	
	$print = mysql_fetch_array($query);
	
	if(!empty($_REQUEST['vidEscenicID'])){
		
		$mediaID = mysql_query("SELECT * FROM media_table ORDER BY media_ID DESC LIMIT 1");
	
		$array = mysql_fetch_array($mediaID);
		
		$newMediaID = ++$array['media_ID'];
		
		
		if($print['media_type'] == "video"){
			mysql_query("UPDATE media_table SET media_data='".$_REQUEST['coords']."' WHERE content_ID = '".$_REQUEST['contentid']."' AND media_type = 'video'");
		}else {
			mysql_query("INSERT INTO media_table (media_ID, content_ID, media_type, media_title, media_data, media_text) VALUES ('".$newMediaID."', '".$_REQUEST['article']."', 'video', '', '".$_REQUEST['vidEscenicID']."', '')");
		}	
			
	}
	
	if(isset($_REQUEST['delVideo'])) {
		mysql_query("DELETE FROM media_table WHERE content_ID = '".$_REQUEST['article']."' AND media_type = 'video'");
	}
	
	echo "<div id='embedPlayerHere'></div><script type='text/javascript' src='http://aftenposten.no/embed?id=".$print['media_data']."&width=300&height=400'></script>";
	
/* 	7098630 */
?>