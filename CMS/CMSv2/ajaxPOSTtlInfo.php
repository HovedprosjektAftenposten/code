<?php
header ('content-type:text/html;charset=utf-8');
include('connect.inc');


$result = mysql_query("SELECT * FROM category_table WHERE tl_ID = '".$_REQUEST['tlID']."'");
$print = mysql_fetch_array($result);


	if(isset($_REQUEST['title'])){
		mysql_query("UPDATE timeline_table SET tl_name='".$_REQUEST['title']."' WHERE tl_ID = '".$_REQUEST['tlID']."'");
	}
	if(isset($_REQUEST['text'])){
		mysql_query("UPDATE timeline_table SET tl_ingress='".$_REQUEST['text']."' WHERE tl_ID = '".$_REQUEST['tlID']."'");
	}
	if(isset($_REQUEST['category'])){
		if(empty($print['category1'])){
			mysql_query("UPDATE category_table SET category1='".htmlentities($_REQUEST['category'])."' WHERE tl_ID = '".$_REQUEST['tlID']."'");
		}
		else if(empty($print['category2'])){
			mysql_query("UPDATE category_table SET category2='".htmlentities($_REQUEST['category'])."' WHERE tl_ID = '".$_REQUEST['tlID']."'");	
		}
		else if(empty($print['category3'])){
			mysql_query("UPDATE category_table SET category3='".htmlentities($_REQUEST['category'])."' WHERE tl_ID = '".$_REQUEST['tlID']."'");			
		}
		else if(empty($print['category4'])){
			mysql_query("UPDATE category_table SET category4='".htmlentities($_REQUEST['category'])."' WHERE tl_ID = '".$_REQUEST['tlID']."'");			
		}
		else if(empty($print['category5'])){
			mysql_query("UPDATE category_table SET category5='".htmlentities($_REQUEST['category'])."' WHERE tl_ID = '".$_REQUEST['tlID']."'");		
		}
		else if(empty($print['category6'])){
			mysql_query("UPDATE category_table SET category6='".htmlentities($_REQUEST['category'])."' WHERE tl_ID = '".$_REQUEST['tlID']."'");	
		}
	}
	

?>