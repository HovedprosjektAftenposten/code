<?php
		$connect = mysql_connect("localhost", "root", "root"); //kobler til server (server, brukernavn, passord)
			if (!$connect) {
				die('Could not connect: ' . mysql_error()); //hvis tilkoblingen ikke blir gjennomført blir det feilmelding
			}
		mysql_select_db("aftenposten", $connect); //velger database/schema
	
		$query = mysql_query("SELECT * FROM media_table WHERE content_ID = '".$_REQUEST['article']."' AND media_type = 'map'");
		
		$print = mysql_fetch_array($query);
		
		if(!empty($print['media_data'])){
			echo $print['media_data'];
		}else{
			echo "59.9138688,10.752245399999993,9";
		}
		
		if(!empty($_REQUEST['coords'])){
			mysql_query("UPDATE media_table SET media_data='".$_REQUEST['coords']."', media_type = 'map' WHERE content_ID = '".$_REQUEST['contentid']."'");
		}
		
		
?>