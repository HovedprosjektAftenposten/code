<?php
include('connect.inc.php');


$result = mysql_query("SELECT * FROM timeline_table WHERE tl_ID = '".$_REQUEST['tlID']."'");
$result2 = mysql_query("SELECT * FROM category_table WHERE tl_ID = '".$_REQUEST['tlID']."'");
$print = mysql_fetch_array($result);
$print2 = mysql_fetch_array($result2);

	if(isset($_REQUEST['title'])){
		mysql_query("UPDATE timeline_table SET tl_name='".$_REQUEST['title']."' WHERE tl_ID = '".$_REQUEST['tlID']."'");
	}
	if(isset($_REQUEST['text'])){
		mysql_query("UPDATE timeline_table SET tl_ingress='".$_REQUEST['text']."' WHERE tl_ID = '".$_REQUEST['tlID']."'");
	}
	if(isset($_REQUEST['category'])){
		if(empty($print2['category1'])){
			mysql_query("UPDATE category_table SET category1='".$_REQUEST['category']."' WHERE tl_ID = '".$_REQUEST['tlID']."'");
		}
		else if(empty($print2['category2'])){
			mysql_query("UPDATE category_table SET category2='".$_REQUEST['category']."' WHERE tl_ID = '".$_REQUEST['tlID']."'");	
		}
		else if(empty($print2['category3'])){
			mysql_query("UPDATE category_table SET category3='".$_REQUEST['category']."' WHERE tl_ID = '".$_REQUEST['tlID']."'");			
		}
		else if(empty($print2['category4'])){
			mysql_query("UPDATE category_table SET category4='".$_REQUEST['category']."' WHERE tl_ID = '".$_REQUEST['tlID']."'");			
		}
		else if(empty($print2['category5'])){
			mysql_query("UPDATE category_table SET category5='".$_REQUEST['category']."' WHERE tl_ID = '".$_REQUEST['tlID']."'");		
		}
		else if(empty($print2['category6'])){
			mysql_query("UPDATE category_table SET category6='".$_REQUEST['category']."' WHERE tl_ID = '".$_REQUEST['tlID']."'");	
		}
	}
	

?>