<?php
include('connect.inc.php');


$felt = null;
$sql = "";

$title = $_REQUEST['title'];
$date = $_REQUEST['date'];
$text = $_REQUEST['text'];
$tlID = $_REQUEST['tlID'];


	if(isset($title)){
		mysql_query("UPDATE timeline_table SET tl_name='$title' WHERE tl_ID = $tlID");
		$felt ='Navn';
	}
	if(isset($date)){
		mysql_query("UPDATE timeline_table SET tl_date='$date' WHERE tl_ID = $tlID");		
		$felt = 'Tekst';
	}//if
	if(isset($text)){
		mysql_query("UPDATE timeline_table SET tl_desc='$text' WHERE tl_ID = $tlID");
		$felt = 'Info';
	}
	

echo "<p>$felt er oppdatert</p>";

?>