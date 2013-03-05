<?php
include('connect.inc.php');


$felt = null;
$sql = "";

$overskrift = $_REQUEST['overskrift'];
$dato = $_REQUEST['dato'];
$tid = $_REQUEST['tid'];
$text = $_REQUEST['text'];
$tlID = $_REQUEST['tlid'];
$contentID = $_REQUEST['contentid'];


	if(isset($overskrift)){
		mysql_query("UPDATE content_table SET content_title='$overskrift' WHERE content_ID = $contentID");
		$felt ='Navn';
	}
	if(isset($dato)){
		mysql_query("UPDATE content_table SET content_date='$dato' WHERE content_ID = $contentID");		
		$felt = 'Tekst';
	}//if
	if(isset($tid)){
		mysql_query("UPDATE content_table SET content_time='$tid' WHERE content_ID = $contentID");		
		$felt = 'Navn';
	}
	if(isset($text)){
		mysql_query("UPDATE content_table SET content_content='$text' WHERE content_ID = $contentID");
		$felt = 'Info';
	}
	

echo "<p>$felt er oppdatert</p>";

?>