<?php
	// Script that updates fields in content_table for a specific article. 
	
	// Gets data from an ajax-function in js/javaScript.js
	
	// 
	
	// connectionstring
	include('connect.inc'); 
	header ('content-type:text/html;charset=utf-8');
	
		// start of script. If field is set, update a field in the database with that value
		if(isset($_REQUEST['overskrift'])){
			mysql_query("UPDATE content_table SET content_title='".htmlentities($_REQUEST['overskrift'])."' WHERE content_ID = '".$_REQUEST['contentid']."'");
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
		if(isset($_REQUEST['custom'])){
			mysql_query("UPDATE content_table SET content_custom='".htmlentities($_REQUEST['custom'])."' WHERE content_ID = '".$_REQUEST['contentid']."'");
		}

?>