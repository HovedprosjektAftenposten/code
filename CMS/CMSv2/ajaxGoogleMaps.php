<?php
	// Script that saves mapdata to media_table
	// &&
	// Prints mapdata to edit.php
	//
	//
		// connectionstring start
		$connect = mysql_connect("localhost", "root", "root");
			if (!$connect) {
				die('Could not connect: ' . mysql_error());
			}
		mysql_select_db("aftenposten", $connect);
		// connectionstring end
	
		$query = mysql_query("SELECT * FROM media_table WHERE content_ID = '".$_REQUEST['article']."' AND media_type = 'map'");
		
		$print = mysql_fetch_array($query);
		
		// increment media ID by 1
		$mediaID = mysql_query("SELECT * FROM media_table ORDER BY media_ID DESC LIMIT 1");
	
		$array = mysql_fetch_array($mediaID);
	
		$newMediaID = ++$array['media_ID'];
		
		// print mapdata to edit.php 
		if(!empty($print['media_data'])){
			echo $print['media_data'];
		}else{
			echo "59.9138688,10.752245399999993,9";
		}
		// add mapdata to database
		if(!empty($_REQUEST['coords'])){
			if($print['media_type'] == "map"){
				mysql_query("UPDATE media_table SET media_data='".$_REQUEST['coords']."' WHERE content_ID = '".$_REQUEST['article']."' AND media_type = 'map'");
				mysql_query("UPDATE content_table SET content_media= '1' WHERE content_ID = '".$_REQUEST['article']."'");
			}else {
				mysql_query("INSERT INTO media_table (media_ID, content_ID, media_type, media_title, media_data, media_text) VALUES ('".$newMediaID."', '".$_REQUEST['article']."', 'map', '', '".$_REQUEST['coords']."', '')");
				mysql_query("UPDATE content_table SET content_media= '1' WHERE content_ID = '".$_REQUEST['article']."'");
			}
		}
		
		if(!empty($_REQUEST['delMap'])) {
			mysql_query("DELETE FROM media_table WHERE content_ID = '".$_REQUEST['article']."' AND media_type = 'map'");
		}
?>