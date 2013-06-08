<?php
	include('connect.inc');
	$result = mysql_query("SELECT COUNT(media_ID) FROM media_table WHERE content_ID ='".$_REQUEST['article']."' ");
	
	$row = mysql_fetch_row($result);
	$mediaCount = $row[0];
	
	if($mediaCount == 0){
		mysql_query("UPDATE content_table SET content_media= '0' WHERE content_ID = '".$_REQUEST['article']."'");
	}
?>