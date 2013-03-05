<?php
	//Kode som henter data fra et form og setter de inn i databasen under den aktuelle tidslinjen

	ob_start();
	include('connect.inc.php');

	$get = $_GET['id'];
	
	$sql = "SELECT * FROM content_table ORDER BY content_ID DESC LIMIT 1";
	
	$maxID = mysql_query($sql);
	
	while($row = mysql_fetch_array($maxID)) {
		$ID = $row['content_ID'];
		$newID = ++$ID;
	}
	
	if(isset($live)) {
		$live = 1;
	}
	else {
		$live = 0;
	}
	
	mysql_query("INSERT INTO content_table (content_ID, tl_ID) VALUES ('$newID','$get')");
	mysql_query("INSERT INTO pic_table (content_ID) VALUES ('$newID')");
	
	header('Location:edit.php?id='.$get.'&article='.$newID);
	
?>