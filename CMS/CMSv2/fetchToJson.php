<?php 

header("Content-Type: application/json; charset=utf-8");
header("access-control-allow-origin: *");

$connect = mysql_connect("localhost", "root", "root"); // Connect 
	if (!$connect) {
		die('Could not connect: ' . mysql_error());  // Displays error if there is no connection
	}
	mysql_select_db("aftenposten", $connect); // Pick database/schema
	mysql_query ('SET NAMES utf8');
	
function fetchData(){
	// Pseudo-callback
	$get = $_GET['id'];

	// Query with LEFT JOIN to show content without belonging media.
	$result = mysql_query("
	
	SELECT t.tl_ID, t.tl_name, t.tl_date, t.tl_ingress, t.tl_lastEdit, cat.category1, cat.category2, cat.category3, cat.category4, cat.category5, cat.category6, cat.color1, cat.color2, cat.color3, cat.color4, cat.color5, cat.color6, c.content_ID, c.content_time, c.content_date, c.content_title, c.content_content, c.content_category, c.content_status, c.content_custom, c.content_media, c.content_important, m.media_ID, m.media_type, m.media_title, m.media_data, m.media_text
	FROM timeline_table t
		LEFT JOIN category_table cat on t.tl_ID = cat.category_ID
		LEFT JOIN content_table c ON t.tl_ID = c.tl_ID
		LEFT JOIN media_table m ON c.content_ID = m.content_ID
	WHERE t.tl_ID = $get
	ORDER BY t.tl_ID, c.content_date, c.content_time, m.content_ID
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
			$jsonData['timeline'][$timelineIndex]['tl_lastEdit'] = $row['tl_lastEdit'];
			
			$jsonData['timeline'][$timelineIndex]['categories'][] = array(
				'category1' => $row['category1'],
				'category2' => $row['category2'],
				'category3' => $row['category3'],
				'category4' => $row['category4'],
				'category5' => $row['category5'],
				'category6' => $row['category6'],
				'color1' => $row['color1'],
				'color2' => $row['color2'],
				'color3' => $row['color3'],
				'color4' => $row['color4'],
				'color5' => $row['color5'],
				'color6' => $row['color6']
			);
			
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
			
			$jsonData['timeline'][$timelineIndex]['content'][$contentIndex]['content_status'] = $row['content_status'];
			$jsonData['timeline'][$timelineIndex]['content'][$contentIndex]['content_custom'] = $row['content_custom'];
			$jsonData['timeline'][$timelineIndex]['content'][$contentIndex]['content_media'] = $row['content_media'];
			$jsonData['timeline'][$timelineIndex]['content'][$contentIndex]['content_important'] = $row['content_important'];
			
			// Declare array for pictures
			$jsonData['timeline'][$timelineIndex]['content'][$contentIndex]['media'] = array();
		}
		// Add picture data to current content data
		$jsonData['timeline'][$timelineIndex]['content'][$contentIndex]['media'][] = array(
			'media_ID' => $row['media_ID'],
			'media_type' => $row['media_type'],
			'media_title' => $row['media_title'],
			'media_data' => $row['media_data'],
			'media_text' => $row['media_text']
		);
		
	}
	// Encodes JSON
	echo json_encode($jsonData);
}
fetchData();
?>