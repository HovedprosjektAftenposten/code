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
	
	
	else if($_REQUEST['catnr'] == "cat1"){
		mysql_query("UPDATE category_table SET color1 = '".$_REQUEST['color']."' WHERE tl_ID = '".$_REQUEST['id']."'");
	}
	else if($_REQUEST['catnr'] == "cat2"){
		mysql_query("UPDATE category_table SET color2 = '".$_REQUEST['color']."' WHERE tl_ID = '".$_REQUEST['id']."'");
	}
	else if($_REQUEST['catnr'] == "cat3"){
		mysql_query("UPDATE category_table SET color3 = '".$_REQUEST['color']."' WHERE tl_ID = '".$_REQUEST['id']."'");
	}
	else if($_REQUEST['catnr'] == "cat4"){
		mysql_query("UPDATE category_table SET color4 = '".$_REQUEST['color']."' WHERE tl_ID = '".$_REQUEST['id']."'");
	}
	else if($_REQUEST['catnr'] == "cat5"){
		mysql_query("UPDATE category_table SET color5 = '".$_REQUEST['color']."' WHERE tl_ID = '".$_REQUEST['id']."'");
	}
	else if($_REQUEST['catnr'] == "cat6"){
		mysql_query("UPDATE category_table SET color6 = '".$_REQUEST['color']."' WHERE tl_ID = '".$_REQUEST['id']."'");
	}
	
	
	else if(isset($_REQUEST['category1'])){
		mysql_query("UPDATE category_table SET category1 = '".$_REQUEST['category1']."' WHERE tl_ID = '".$_REQUEST['id']."'");
	}
	else if(isset($_REQUEST['category2'])){
		mysql_query("UPDATE category_table SET category2 = '".$_REQUEST['category2']."' WHERE tl_ID = '".$_REQUEST['id']."'");
	}
	else if(isset($_REQUEST['category3'])){
		mysql_query("UPDATE category_table SET category3 = '".$_REQUEST['category3']."' WHERE tl_ID = '".$_REQUEST['id']."'");
	}
	else if(isset($_REQUEST['category4'])){
		mysql_query("UPDATE category_table SET category4 = '".$_REQUEST['category4']."' WHERE tl_ID = '".$_REQUEST['id']."'");
	}
	else if(isset($_REQUEST['category5'])){
		mysql_query("UPDATE category_table SET category5 = '".$_REQUEST['category5']."' WHERE tl_ID = '".$_REQUEST['id']."'");
	}
	else if(isset($_REQUEST['category6'])){
		mysql_query("UPDATE category_table SET category6 = '".$_REQUEST['category6']."' WHERE tl_ID = '".$_REQUEST['id']."'");
	}
?>