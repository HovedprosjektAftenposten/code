<?php

	include("connect.inc");
	
	$result = mysql_query("SELECT * FROM category_table WHERE tl_ID = '".$_REQUEST['id']."'");
	
	$print = mysql_fetch_array($result);
	
	if($_REQUEST['slett'] == "category1"){
		mysql_query("UPDATE category_table SET category1 = '' WHERE tl_ID = '".$_REQUEST['id']."'");
	}
	else if($_REQUEST['slett'] == "category2"){
		mysql_query("UPDATE category_table SET category2 = '' WHERE tl_ID = '".$_REQUEST['id']."'");
	}
	else if($_REQUEST['slett'] == "category3"){
		mysql_query("UPDATE category_table SET category3 = '' WHERE tl_ID = '".$_REQUEST['id']."'");
	}
	else if($_REQUEST['slett'] == "category4"){
		mysql_query("UPDATE category_table SET category4 = '' WHERE tl_ID = '".$_REQUEST['id']."'");
	}
	else if($_REQUEST['slett'] == "category5"){
		mysql_query("UPDATE category_table SET category5 = '' WHERE tl_ID = '".$_REQUEST['id']."'");
	}
	else if($_REQUEST['slett'] == "category6"){
		mysql_query("UPDATE category_table SET category6 = '' WHERE tl_ID = '".$_REQUEST['id']."'");
	}
	
	
	else if(isset($_REQUEST['color'])){
		mysql_query("UPDATE category_table SET color1 = '".$_REQUEST['color']."' WHERE tl_ID = '".$_REQUEST['id']."'");
	}
?>