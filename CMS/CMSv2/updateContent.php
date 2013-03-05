<?php

	

	// Kode som henter data fra et form og oppdaterer den aktuelle artikkelen i databasen.
	


	
	ob_start();
	include('connect.inc.php');

	$getTLID = $_REQUEST['id'];
	$getContentID = $_REQUEST['article'];

	$overskrift = $_REQUEST['overskrift'];
	$dato = $_REQUEST['dato'];
	$tid = $_REQUEST['tid'];
	$text = $_REQUEST['articleText'];
	$purl = $_REQUEST['purl'];
	$kladd = $_REQUEST['saveDraft'];
	$publiser = $_REQUEST['savePublish'];
	$slett = $_REQUEST['delete'];
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
		mysql_query("UPDATE pic_table SET pic_path='$purl' WHERE content_ID = $getContentID");
		header('Location:edit.php?id='.$getTLID.'&article='.$getContentID);
	}
	if(isset($publiser)) {
		$live = 1;
		mysql_query("UPDATE content_table SET content_time='$tid', content_date='$dato', content_title='$overskrift', content_content='$text', content_category='1', content_status='$live', pic_ID='1' WHERE content_table.content_ID = $getContentID AND content_table.tl_ID = $getTLID");
		mysql_query("UPDATE pic_table SET pic_path='$purl' WHERE content_ID = $getContentID");
		header('Location:edit.php?id='.$getTLID.'&article='.$getContentID);
	}

	
	
	
	
		


?>