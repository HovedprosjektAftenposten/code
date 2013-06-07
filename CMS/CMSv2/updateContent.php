<?php
	// Fetches data from a form if it is published, drafted or deleted, and updates the article in the database
	ob_start();
	include('connect.inc');
	
	$live = 0; //variable for content status
	
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
	if(isset($_REQUEST['deleteContent'])) {
		mysql_query("DELETE FROM media_table WHERE content_ID = '".$_REQUEST['article']."'");
		mysql_query("DELETE FROM content_table WHERE content_ID = '".$_REQUEST['article']."'");
		header('Location:edit.php?id='.$_REQUEST['id']);
	}
	if(isset($_REQUEST['goBack'])){
		header('Location:edit.php?id='.$_REQUEST['id'].'&article='.$_REQUEST['article']);
	}
	
?>