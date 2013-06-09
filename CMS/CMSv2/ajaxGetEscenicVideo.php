<?php
	// Script that gets escenic video URL and adds to database
	// &&
	// Deletes video
	// &&
	// Prints video to edit.php
	
	// connectionstring start
	$connect = mysql_connect("localhost", "root", "root");
			if (!$connect) {
				die('Could not connect: ' . mysql_error());
			}
		mysql_select_db("aftenposten", $connect);
	// connectionstring end
			
	$query = mysql_query("SELECT * FROM media_table WHERE content_ID = '".$_REQUEST['article']."' AND media_type = 'video'");
	
	$print = mysql_fetch_array($query);
	
	
	if(!empty($_REQUEST['vidEscenicID'])){
		// increments media ID from media_table by 1
		$mediaID = mysql_query("SELECT * FROM media_table ORDER BY media_ID DESC LIMIT 1");
	
		$array = mysql_fetch_array($mediaID);
		
		$newMediaID = ++$array['media_ID'];
		
		// updates or inserts a row in database with video URL
		if($print['media_type'] == "video"){
			mysql_query("UPDATE media_table SET media_data='".$_REQUEST['coords']."' WHERE content_ID = '".$_REQUEST['contentid']."' AND media_type = 'video'");
			mysql_query("UPDATE content_table SET content_media= '1' WHERE content_ID = '".$_REQUEST['article']."'");
			
		}else {
			mysql_query("INSERT INTO media_table (media_ID, content_ID, media_type, media_title, media_data, media_text) VALUES ('".$newMediaID."', '".$_REQUEST['article']."', 'video', '', '".$_REQUEST['vidEscenicID']."', '')");
			mysql_query("UPDATE content_table SET content_media= '1' WHERE content_ID = '".$_REQUEST['article']."'");
		}	
			
	}
	// delete video
	if(isset($_REQUEST['delVideo'])) {
		mysql_query("DELETE FROM media_table WHERE content_ID = '".$_REQUEST['article']."' AND media_type = 'video'");
	}
	
	// print video to edit.php
	echo "<div id='embedPlayerHere'></div><script type='text/javascript' src='http://aftenposten.no/embed?id=".$print['media_data']."&width=300&height=200'></script>";
	
	// Example escenic ID: 7098630 
?>