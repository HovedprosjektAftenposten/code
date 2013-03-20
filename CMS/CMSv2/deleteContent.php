<?php
	ob_start();
	include('connect.inc.php');
	
	if(isset($_REQUEST['deleteContent'])) {
		mysql_query("DELETE FROM media_table WHERE content_ID = '".$_REQUEST['article']."'");
		mysql_query("DELETE FROM content_table WHERE content_ID = '".$_REQUEST['article']."'");
		header('Location:edit.php?id='.$_REQUEST['id']);
	}
	if(isset($_REQUEST['goBack'])){
		header('Location:edit.php?id='.$_REQUEST['id'].'&article='.$_REQUEST['article']);
	}

?>