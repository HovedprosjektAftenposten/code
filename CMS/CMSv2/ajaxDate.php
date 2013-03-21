<?php

	include('connect.inc.php');
	
	if(isset($_REQUEST['dateTime'])){
		mysql_query("UPDATE timeline_table SET tl_lastEdit ='".$_REQUEST['dateTime']."' WHERE tl_ID ='".$_REQUEST['id']."'");
	}

?>