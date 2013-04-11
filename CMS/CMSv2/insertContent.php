<?php
	//Kode som henter data fra et form og setter de inn i databasen under den aktuelle tidslinjen

	ob_start();
	include('connect.inc');
	
	/*
$sql = "SELECT * FROM content_table ORDER BY content_ID DESC LIMIT 1";
	
	$sql2 = "SELECT * FROM media_table ORDER BY media_ID DESC LIMIT 1";
*/
	
	$maxContentID = mysql_query("SELECT * FROM content_table ORDER BY content_ID DESC LIMIT 1");
	$maxMediaID = mysql_query("SELECT * FROM media_table ORDER BY media_ID DESC LIMIT 1");
	
	$contentID = mysql_fetch_array($maxContentID);
	
	if(empty($contentID['content_ID'])) {
		$newContentID = 1;
	} else {
		$newContentID = ++$contentID['content_ID'];
	}
	
	$mediaID = mysql_fetch_array($maxMediaID);
	
	if(empty($mediaID['media_ID'])) {
		$newMediaID = 1;
	} else {
		$newMediaID = ++$mediaID['media_ID'];
	}
	
	
	mysql_query("INSERT INTO content_table (content_ID, tl_ID, content_media) VALUES ('$newContentID','".$_REQUEST['id']."','0')");
	mysql_query("INSERT INTO media_table (media_ID, content_ID) VALUES ('$newMediaID','$newContentID')");
	
	
	header('Location:edit.php?id='.$_REQUEST['id'].'&article='.$newContentID);

?>