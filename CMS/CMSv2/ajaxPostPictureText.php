<?php
	// Script that updates picturetext in media_table for a specific picture
	//
	//
	
	header ('content-type:text/html;charset=utf-8');
	include('connect.inc');


	$result = mysql_query("SELECT * FROM media_table WHERE media_ID = '".$_REQUEST['mediaID']."'");
	$print = mysql_fetch_array($result);
	
	mysql_query("UPDATE media_table SET media_text = '".$_REQUEST['pictureText']."' WHERE media_ID ='".$_REQUEST['mediaID']."'");

?>