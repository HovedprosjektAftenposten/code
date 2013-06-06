<?php
	// Script that updates the database if an article is set to important
	//
	//

	include('connect.inc');
	
	if(isset($_REQUEST['important'])){
		mysql_query("UPDATE content_table SET content_important = '".$_REQUEST['important']."' WHERE content_ID = '".$_REQUEST['article']."'");
	}

?>