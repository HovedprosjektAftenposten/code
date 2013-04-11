<?php
include('connect.inc');

	if(isset($_REQUEST['overskrift'])){
		mysql_query("UPDATE content_table SET content_title='".$_REQUEST['overskrift']."' WHERE content_ID = '".$_REQUEST['contentid']."'");
	}
	if(isset($_REQUEST['dato'])){
		mysql_query("UPDATE content_table SET content_date='".$_REQUEST['dato']."' WHERE content_ID = '".$_REQUEST['contentid']."'");		
	}
	if(isset($_REQUEST['tid'])){
		mysql_query("UPDATE content_table SET content_time='".$_REQUEST['tid']."' WHERE content_ID = '".$_REQUEST['contentid']."'");		
	}
	if(isset($_REQUEST['text'])){
		mysql_query("UPDATE content_table SET content_content='".$_REQUEST['text']."' WHERE content_ID = '".$_REQUEST['contentid']."'");
	}
	if(isset($_REQUEST['purl'])){
		mysql_query("UPDATE media_table SET media_data='".$_REQUEST['purl']."', media_type='picture' WHERE content_ID = '".$_REQUEST['contentid']."'");
	}
	if(isset($_REQUEST['custom'])){
		mysql_query("UPDATE content_table SET content_custom='".$_REQUEST['custom']."' WHERE content_ID = '".$_REQUEST['contentid']."'");
	}

?>