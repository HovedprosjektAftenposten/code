<?php
	ob_start();
	include('connect.inc.php');
	
	
	$sql = "SELECT * FROM timeline_table ORDER BY tl_ID DESC LIMIT 1";
	
	$maxID = mysql_query($sql);
	
	$ID = mysql_fetch_array($maxID);
	
	if(empty($ID['tl_ID'])) {
		$newID = 1;
	}else {
		$newID = ++$ID['tl_ID'];
	}
	
	mysql_query("INSERT INTO timeline_table (tl_ID) VALUES ('$newID')");
	
	header('Location:edit.php?id='.$newID);
?>