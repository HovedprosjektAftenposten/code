<?php

	

	// Kode som henter data fra et form og oppdaterer den aktuelle artikkelen i databasen.
	


	
	ob_start();
	include('connect.inc.php');

	$getTLID = $_GET['id'];
	$getContentID = $_GET['article'];

	$overskrift = $_POST['overskrift'];
	$dato = $_POST['dato'];
	$tid = $_POST['tid'];
	$text = $_POST['articleText'];
	$kladd = $_POST['saveDraft'];
	$publiser = $_POST['savePublish'];
	$slett = $_POST['delete'];
	$live = 0;
	
/*
	if($valg == isset($kladd)) {
		$live = 0;
	}
	if($valg == isset($publiser)) {
		$live = 1;
	}
	
*/
	/*
if (isset($save) && !empty($valg)) {
		$live = $valg;
	}
*/

	if(isset($kladd)) {
		$live = 0;
		mysql_query("UPDATE content_table SET content_time='$tid', content_date='$dato', content_title='$overskrift', content_content='$text', content_category='1', content_status='$live', pic_ID='1' WHERE content_table.content_ID = $getContentID AND content_table.tl_ID = $getTLID");
		header('Location:edit.php?id='.$getTLID.'&article='.$getContentID);
	}
	if(isset($publiser)) {
		$live = 1;
		mysql_query("UPDATE content_table SET content_time='$tid', content_date='$dato', content_title='$overskrift', content_content='$text', content_category='1', content_status='$live', pic_ID='1' WHERE content_table.content_ID = $getContentID AND content_table.tl_ID = $getTLID");
		header('Location:edit.php?id='.$getTLID.'&article='.$getContentID);
	}

	
	
	
	
		


?>