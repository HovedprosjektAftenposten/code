<?php

include('connect.inc.php');


$overskrift = $_REQUEST['overskrift'];
$dato = $_REQUEST['dato'];
$tid = $_REQUEST['tid'];
$text = $_REQUEST['text'];
$tlID = $_REQUEST['tlid'];
$contentID = $_REQUEST['contentid'];

mysql_query("UPDATE content_table SET content_title='$overskrift' WHERE content_ID = $contentID");
mysql_query("UPDATE content_table SET content_date='$dato' WHERE content_ID = $contentID");
mysql_query("UPDATE content_table SET content_time='$tid' WHERE content_ID = $contentID");
mysql_query("UPDATE content_table SET content_content='$text' WHERE content_ID = $contentID");
/*
echo $overskrift;
echo $dato;
echo $tid;
echo $text;
*/



?>