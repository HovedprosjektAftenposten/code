<?php 

header("Content-Type: application/json");
header("access-control-allow-origin: *");

$connect = mysql_connect("localhost", "root", ""); // Connect 
	if (!$connect) {
		die('Could not connect: ' . mysql_error());  // Displays error if there is no connection
	}
	mysql_select_db("hovedprosjekt", $connect); // Pick database/schema
	
function fetchData(){
	// Pseudo-callback
	$get = $_GET['id'];

	// Query with LEFT JOIN to show content without belonging pictures etc, WHERE for pseudo-callback. WHERE content_status = 1 later, to 
	$result = mysql_query("
	
	SELECT t.tl_ID, t.tl_name, t.tl_date, t.tl_ingress, c.content_ID, c.content_time, c.content_date, c.content_title, c.content_content, c.content_category, p.pic_ID, p.pic_path, p.pic_desc, p.pic_link
	FROM timeline_table t
		LEFT JOIN content_table c ON t.tl_ID = c.tl_ID
		LEFT JOIN pic_table p ON c.content_ID = p.content_ID
	WHERE t.tl_ID = $get
	ORDER BY t.tl_ID, c.tl_ID, p.content_ID
	
	") or die(mysql_error()); 
	
	// Declare array for json
	$jsonData = array();
	
	// Variables for timeline and content to filter out data
	$tl_ID = 0;
	$content_ID = 0;
	
	// Variables to hold current index
	$timelineIndex = -1;
	$contentIndex = -1;
	
	// Go through the rows 
	while($row = mysql_fetch_assoc($result)){
		// Check if the declared $tl_ID is not equal to tl_ID from db
		if($tl_ID != $row['tl_ID']){
			$timelineIndex++;
			$contentIndex = -1;
			$tl_ID = $row['tl_ID'];
			
			// Add timeline-data to array
			$jsonData['timeline'][$timelineIndex]['tl_ID'] = $row['tl_ID'];
			$jsonData['timeline'][$timelineIndex]['tl_name'] = $row['tl_name'];
			$jsonData['timeline'][$timelineIndex]['tl_date'] = $row['tl_date'];
			$jsonData['timeline'][$timelineIndex]['tl_ingress'] = $row['tl_ingress'];
			
			// Declare array for content
			$jsonData['timeline'][$timelineIndex]['content'] = array();
		}
		// Check if the declared $content_ID is not equal to content_ID from db
		if($content_ID != $row['content_ID']){
			$contentIndex++;
			$content_ID = $row['content_ID'];
			
			// Add content-data to array
			$jsonData['timeline'][$timelineIndex]['content'][$contentIndex]['content_ID'] = $row['content_ID'];
			$jsonData['timeline'][$timelineIndex]['content'][$contentIndex]['content_time'] = $row['content_time'];
			$jsonData['timeline'][$timelineIndex]['content'][$contentIndex]['content_date'] = $row['content_date'];
			$jsonData['timeline'][$timelineIndex]['content'][$contentIndex]['content_title'] = $row['content_title'];
			$jsonData['timeline'][$timelineIndex]['content'][$contentIndex]['content_content'] = $row['content_content'];
			$jsonData['timeline'][$timelineIndex]['content'][$contentIndex]['content_category'] = $row['content_category'];
			
			// Declare array for pictures
			$jsonData['timeline'][$timelineIndex]['content'][$contentIndex]['pictures'] = array();
		}
		// Add picture data to current content data
		$jsonData['timeline'][$timelineIndex]['content'][$contentIndex]['pictures'][] = array(
			'pic_ID' => $row['pic_ID'],
			'pic_path' => $row['pic_path'],
			'pic_desc' => $row['pic_desc'],
			'pic_link' => $row['pic_link']
		);
		
	}
	// Encodes JSON with, and strips links for slashes
	echo stripslashes(json_encode($jsonData));
}
fetchData();
?>