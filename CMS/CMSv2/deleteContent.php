<?php
	ob_start();
	include('connect.inc.php');
	
	$getTLID = $_GET['id'];
	$getContentID = $_GET['article'];
	
	$slett = $_POST['delete'];
	$angre = $_POST['goBack'];
	
	if(isset($slett)) {
		mysql_query("DELETE FROM content_table WHERE content_ID = $getContentID");
		header('Location:edit.php?id='.$getTLID);
	}
	if(isset($angre)){
		header('Location:edit.php?id='.$getTLID.'&article='.$getContentID);
	}

?>