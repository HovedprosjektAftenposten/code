<?php
include('connect.inc.php');

$id = null;
$felt = null;
$sql = "";

$overskrift = $_REQUEST['overskrift'];
$dato = $_REQUEST['dato'];
$tid = $_REQUEST['tid'];
$text = $_REQUEST['text'];
$tlID = $_REQUEST['tlid'];
$contentID = $_REQUEST['contentid'];

if(isset($contentID){
	if(isset($_REQUEST['overskrift'])){
		$sql .= "UPDATE content_table SET content_title = '" . $_REQUEST['overskrift'] . "' WHERE content_ID = " . $contentID;
		$felt ='Navn';
	}
	if(isset($_REQUEST['dato'])){
		$sql .= "UPDATE content_table SET content_date = '" . $_REQUEST['dato'] . "' WHERE content_ID = " . $contentID;
		$felt = 'Tekst';
	}//if
	if(isset($_REQUEST['tid'])){
		$sql .= "UPDATE content_table SET content_time = '" . $_REQUEST['tid'] . "' WHERE content_ID = " . $contentID;
		$felt = 'Navn';
	}
	if(isset($_REQUEST['text'])){
		$sql .= "UPDATE content_table SET content_content = '" . $_REQUEST['text'] . "' WHERE content_ID = " . $$contentID;
		$felt = 'Info';
	}
	
	$res = mysql_query($sql);
	
}

echo mysql_error();
echo "<p>$felt er oppdatert</p>";

?>