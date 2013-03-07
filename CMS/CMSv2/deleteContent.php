<?php
	ob_start();
	include('connect.inc.php');
	
	$getTLID = $_REQUEST['id'];
	$getContentID = $_REQUEST['article'];
	
	$slett = $_REQUEST['deleteContent'];
	$angre = $_REQUEST['goBack'];
	
	if(isset($slett)) {
		mysql_query("DELETE FROM content_table WHERE content_ID = $getContentID");
		mysql_query("DELETE FROM pic_table WHERE content_ID = $getContentID");
		header('Location:edit.php?id='.$getTLID);
	}
	if(isset($angre)){
		header('Location:edit.php?id='.$getTLID.'&article='.$getContentID);
	}

?>