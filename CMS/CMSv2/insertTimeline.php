<?php
	ob_start();
	include('connect.inc.php');
	
	
	$sql = "SELECT * FROM timeline_table ORDER BY tl_ID DESC LIMIT 1";
	
	$maxID = mysql_query($sql);
	
	while($row = mysql_fetch_array($maxID)) {
		$ID = $row['tl_ID'];
		$newID = ++$ID;
	}
	
	mysql_query("INSERT INTO timeline_table (tl_ID) VALUES ('$newID')");
	
	header('Location:edit.php?id='.$newID);
?>