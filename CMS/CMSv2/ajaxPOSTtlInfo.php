<?php
include('connect.inc.php');


$result = mysql_query("SELECT * FROM timeline_table WHERE tl_ID = '".$_REQUEST['tlID']."'");
$print = mysql_fetch_array($result);

	if(isset($_REQUEST['title'])){
		mysql_query("UPDATE timeline_table SET tl_name='".$_REQUEST['title']."' WHERE tl_ID = '".$_REQUEST['tlID']."'");
	}
	if(isset($_REQUEST['text'])){
		mysql_query("UPDATE timeline_table SET tl_ingress='".$_REQUEST['text']."' WHERE tl_ID = '".$_REQUEST['tlID']."'");
	}
	if(isset($_REQUEST['category'])){
		if(empty($print['tl_category1'])){
			mysql_query("UPDATE timeline_table SET tl_category1='".$_REQUEST['category']."' WHERE tl_ID = '".$_REQUEST['tlID']."'");
		}
		else if(empty($print['tl_category2'])){
			mysql_query("UPDATE timeline_table SET tl_category2='".$_REQUEST['category']."' WHERE tl_ID = '".$_REQUEST['tlID']."'");	
		}
		else if(empty($print['tl_category3'])){
			mysql_query("UPDATE timeline_table SET tl_category3='".$_REQUEST['category']."' WHERE tl_ID = '".$_REQUEST['tlID']."'");			
		}
		else if(empty($print['tl_category4'])){
			mysql_query("UPDATE timeline_table SET tl_category4='".$_REQUEST['category']."' WHERE tl_ID = '".$_REQUEST['tlID']."'");			
		}
		else if(empty($print['tl_category5'])){
			mysql_query("UPDATE timeline_table SET tl_category5='".$_REQUEST['category']."' WHERE tl_ID = '".$_REQUEST['tlID']."'");		
		}
		else if(empty($print['tl_category6'])){
			mysql_query("UPDATE timeline_table SET tl_category6='".$_REQUEST['category']."' WHERE tl_ID = '".$_REQUEST['tlID']."'");	
		}
	}
	

?>