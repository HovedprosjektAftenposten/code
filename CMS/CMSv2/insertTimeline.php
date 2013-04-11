<?php
	ob_start();
	include('connect.inc');
	
	$maxTLID = mysql_query("SELECT * FROM timeline_table ORDER BY tl_ID DESC LIMIT 1");
	
	$tlID = mysql_fetch_array($maxTLID);
	
	if(empty($tlID['tl_ID'])) {
		$newTLID = 1;
	}else {
		$newTLID = ++$tlID['tl_ID'];
	}
		
	$maxContentID = mysql_query("SELECT * FROM content_table ORDER BY content_ID DESC LIMIT 1");
	
	$contentID = mysql_fetch_array($maxContentID);
	
	$newContentID = ++$contentID['content_ID'];
	
	$maxMediaID = mysql_query("SELECT * FROM media_table ORDER BY media_ID DESC LIMIT 1");
	
	$mediaID = mysql_fetch_array($maxMediaID);
	
	$newMediaID = ++$mediaID['media_ID'];
	
	$maxCategoryID = mysql_query("SELECT * FROM category_table ORDER BY category_ID DESC LIMIT 1");
	
	$categoryID = mysql_fetch_array($maxCategoryID);
	
	$newCategoryID = ++$categoryID['category_ID'];
	
	mysql_query("INSERT INTO timeline_table (tl_ID) VALUES ('$newTLID')");
	mysql_query("INSERT INTO content_table (content_ID, tl_ID) VALUES ('$newContentID', '$newTLID')");
	mysql_query("INSERT INTO media_table (media_ID, content_ID) VALUES ('$newMediaID', '$newContentID')");
	mysql_query("INSERT INTO category_table (category_ID, tl_ID) VALUES ('$newCategoryID', '$newTLID')");
	
	header('Location:edit.php?id='.$newTLID);
	ob_end_flush();
?>