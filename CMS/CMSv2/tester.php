<?php
	include('connect.inc');
	
	$categoryID = mysql_query("SELECT * FROM test_table ORDER BY cat_ID DESC LIMIT 1");
	
	$fetch = mysql_fetch_array($categoryID);
	
	$newCategoryID = ++$fetch['cat_ID'];
	
	$array = mysql_num_rows(mysql_query("SELECT * FROM test_table WHERE tl_ID = 1"));
	
	
	
	if($array < 6){
		mysql_query("INSERT INTO test_table (cat_ID, tl_ID, category_number, category_name, category_color) VALUES ('$newCategoryID','".$_REQUEST['tlID']."','4','".$_REQUEST['category']."','Orange')");
	}
	
	if (isset($_REQUEST['color'])){
		
	}
	
	echo $array;

	
?>