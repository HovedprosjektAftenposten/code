<?php
	// Script that trims the length of the timelines name, so that it does not float over other content.
	// 
	// 

	header ('content-type:text/html;charset=utf-8');
	// connectionstring start
	$connect = mysql_connect("localhost", "root", "root");
	if (!$connect) {
		die('Could not connect: ' . mysql_error());
	}
	mysql_select_db("aftenposten", $connect);
	mysql_query ('SET NAMES utf8');
	// connectionstring end

	$query = mysql_query("SELECT tl_name FROM timeline_table WHERE tl_ID = '".$_REQUEST['id']."'");
	$result = mysql_fetch_array($query);
	
	// trims if string is longer than 20 characters
	if(strlen($result['tl_name']) > 20){
				$trimName = substr($result['tl_name'], 0, 20).'...';
				echo "<a href='index.php'>Tidslinjer</a> > ".$trimName;
			}else{
				$trimName = $result['tl_name'];
				echo "<a href='index.php'>Tidslinjer</a> > ".$trimName;
			}
	
?>