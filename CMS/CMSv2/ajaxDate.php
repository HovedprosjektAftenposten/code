<?php
	// Script that sets the date and time for the last edit of an article. 
	
	// This is used for sorting of the timelines on index.php
	
	//

	include('connect.inc');
	
	if(isset($_REQUEST['dateTime'])){
		mysql_query("UPDATE timeline_table SET tl_lastEdit ='".$_REQUEST['dateTime']."' WHERE tl_ID ='".$_REQUEST['id']."'");
	}

?>