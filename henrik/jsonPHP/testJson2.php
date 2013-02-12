<?php 

header("Content-Type: application/json");
header("access-control-allow-origin: *");

$connect = mysql_connect("localhost", "root", ""); //kobler til server (server, brukernavn, passord)
	if (!$connect) {
		die('Could not connect: ' . mysql_error()); //hvis tilkoblingen ikke blir gjennomført blir det feilmelding
	}
//	echo '<p style="color: green;">Connected</p>'; //hvis tilkoblingen er OK, skrives Connected ut på skjermen
	mysql_select_db("hovedprosjekt", $connect); //velger database/schema

function fetchData() {
	$get = 1;
	
	$results = mysql_query("
	
	SELECT timeline_table.*, content_table.*, pic_table.*
	FROM timeline_table
		JOIN content_table
			ON content_table.tl_ID = timeline_table.tl_ID
		JOIN pic_table
			ON pic_table.content_ID = content_table.content_ID
	WHERE timeline_table.tl_ID = $get	
	
	") or die(mysql_error());
	
	
	$timeline = array();
	
	while($row = mysql_fetch_assoc($results)){
		
		$timeline['timeline'][] = array(
			'tl_ID' => $row['tl_ID'],
			'tl_name' => $row['tl_name'],
			'tl_date' => $row['tl_date'],
			'tl_desc' => $row['tl_desc'],
		
			$timeline['timeline']['content'][] = array(
				'content_ID' => $row['content_ID'],
				'tl_ID' => $row['tl_ID'],
				'content_time' => $row['content_time'],
				'content_date' => $row['content_date'],
				'content_title' => $row['content_title'],
				'content_content' => $row['content_content'],
				'content_category' => $row['content_category'],
				'content_mapLat' => $row['content_mapLat'],
				'content_mapLng' => $row['content_mapLng'],
				'content_zoomLvl' => $row['content_zoomLvl'],
				
				$timeline['timeline']['content']['pictures'][] = array(
					'pic_ID' => $row['pic_ID'],
					'content_ID' => $row['content_ID'],
					'pic_path' => $row['pic_path'],
					'pic_desc' => $row['pic_desc'],
					'pic_link' => $row['pic_link']
				),
			),
		);
	}

	echo stripslashes(json_encode($timeline));
}
fetchData();
?>