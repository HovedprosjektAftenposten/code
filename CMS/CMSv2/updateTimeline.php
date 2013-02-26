<?php
	ob_start();
	include('connect.inc.php');
	
/* 	henter felter fra tlInfoForm */
	$name = $_POST['nu-timeline-cms-tlTitle'];
	$date = $_POST['nu-timeline-cms-tlDate'];
	$ingress = $_POST['nu-timeline-cms-tlIngress'];
	$hidden = $_POST['hidden'];
		
	mysql_query("UPDATE timeline_table SET tl_name='$name', tl_date='$date', tl_desc='$ingress' WHERE tl_ID = $hidden");

	header('Location:edit.php?id='.$hidden);

?>