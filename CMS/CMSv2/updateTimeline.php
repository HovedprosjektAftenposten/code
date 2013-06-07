<?php
	// Updates timeline name with data from db
	ob_start();
	include('connect.inc.php');
		
	if(isset($_REQUEST['nu-timeline-cms-addCategoryBtn'])) {
		mysql_query("");
	}
	else {
		mysql_query("UPDATE timeline_table SET tl_name='".$_REQUEST['nu-timeline-cms-tlTitle']."', tl_date='".$_REQUEST['nu-timeline-cms-tlDate']."', tl_ingress='".$_REQUEST['nu-timeline-cms-tlIngress']."' WHERE tl_ID = '".$_REQUEST['hidden']."'");
	}


	header('Location:edit.php?id='.$_REQUEST['hidden']);

?>