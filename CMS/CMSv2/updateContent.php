<?php

	

	// Kode som henter data fra et form og oppdaterer den aktuelle artikkelen i databasen.
		
	ob_start();
	include('connect.inc');

	$live = 0;
	
	if(isset($_REQUEST['saveDraft'])) {
		$live = 0;
		mysql_query("UPDATE content_table SET content_status='$live' WHERE content_table.content_ID = '".$_REQUEST['article']."' AND content_table.tl_ID = '".$_REQUEST['id']."' ");
		header('Location:edit.php?id='.$_REQUEST['id'].'&article='.$_REQUEST['article']);
	}
	if(isset($_REQUEST['savePublish'])) {
		$live = 1;
		mysql_query("UPDATE content_table SET content_status='$live' WHERE content_table.content_ID = '".$_REQUEST['article']."' AND content_table.tl_ID = '".$_REQUEST['id']."' ");
		header('Location:edit.php?id='.$_REQUEST['id'].'&article='.$_REQUEST['article']);
	}
	
?>