<?php
include('connect.inc.php');

$get = $_GET['id'];


/*
$sql = "SELECT timeline_table.*, content_table.*, pic_table.* FROM timeline_table, content_table, pic_table WHERE timeline_table.tl_ID = $get";

$result = mysql_query($sql) or die("Error: " . mysql_error());
$result = mysql_fetch_assoc($result);
echo json_encode($result);
*/

$sql = "SELECT timeline_table.*, content_table.*, pic_table.* FROM timeline_table, content_table, pic_table WHERE timeline_table.tl_ID = 1";
/*

$sql2 = "SELECT * FROM content_table WHERE tl_ID = 1";

$sql3 = "SELECT * FROM pic_table WHERE pic_table.content_ID = 1";
*/

$result = mysql_query($sql);
/*
$result2 = mysql_query($sql2);
$result3 = mysql_query($sql3);
*/

while($test = mysql_fetch_array($result)) {
/*
$test2 = mysql_fetch_array($result2);
$test3 = mysql_fetch_array($result3);
*/

	
	$tl_ID = $test['tl_ID'];
	$tl_name = $test['tl_name'];
	$tl_date = $test['tl_date'];
	$tl_desc = $test['tl_desc'];
	$content_ID = $test['content_ID'];
	$content_content = $test['content_content'];
	$pic_ID = $test['pic_ID'];
	$pic_path = $test['pic_path'];
	
};


$json = json_encode(array(
	timeline => array(
		'tlid'=>$tl_ID, 
		'tlname'=>$tl_name, 
		'tldate'=>$tl_date, 
		'tldesc'=>$tl_desc,
		content => array(
			'contentid'=>$content_ID, 
			'content'=>$content_content,
			pictures => array(
				'picid'=>$pic_ID, 
				'path'=>$pic_path
)))));

echo $json;
echo $result['tl_ID'];
echo phpinfo();


/*
$arr = array(test,test);
$arr2 = array(ert,erte);
$arr3 = array_push($arr => $arr2);

echo json_encode($arr3);
*/

?>