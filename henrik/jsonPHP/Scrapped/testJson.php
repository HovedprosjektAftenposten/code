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

	$timelineQuery = mysql_query("SELECT * FROM timeline_table WHERE timeline_table.tl_ID = $get") or die(mysql_error());
	$contentQuery = mysql_query("SELECT * FROM content_table WHERE content_table.tl_ID = $get") or die(mysql_error());
	$picQuery = mysql_query("SELECT * FROM pic_table WHERE pic_table.content_ID = $get") or die(mysql_error());

/*
	$results = mysql_query("
	
	SELECT timeline_table.*, content_table.*, pic_table.*
	FROM timeline_table, content_table, pic_table
	WHERE timeline_table.tl_ID = $get
	AND content_table.tl_ID = $get
	AND pic_table.content_ID = $get
	
	") or die(mysql_error());
*/

/*
	$results = mysql_query("
	
	SELECT timeline_table.*, content_table.*, pic_table.*
	FROM timeline_table
		JOIN content_table
			ON content_table.tl_ID = timeline_table.tl_ID
		JOIN pic_table 
			ON pic_table.content_ID = content_table.content_ID
	WHERE timeline_table.tl_ID = $get
	
	") or die(mysql_error());
*/
	
	while($row = mysql_fetch_assoc($timelineQuery)){
		$timeline['timeline'] = array(
			'tl_ID' => $row['tl_ID'],
			'tl_name' => $row['tl_name'],
			'tl_date' => $row['tl_date'],
			'tl_desc' => $row['tl_desc']
		);
	}
	
	while($row2 = mysql_fetch_assoc($contentQuery)){
		$timeline['timeline']['content'] = array(
			'content_ID' => $row2['content_ID'],
			'tl_ID' => $row2['tl_ID'],
			'content_time' => $row2['content_time'],
			'content_date' => $row2['content_date'],
			'content_title' => $row2['content_title'],
			'content_content' => $row2['content_content'],
			'content_category' => $row2['content_category'],
			'content_mapLat' => $row2['content_mapLat'],
			'content_mapLng' => $row2['content_mapLng'],
			'content_zoomLvl' => $row2['content_zoomLvl'],
			/* 'pic_ID' => $row2['pic_ID'] */
			);
	}

	while($row3 = mysql_fetch_assoc($picQuery)){
		$timeline['timeline']['content']['pictures'][] = array(
			'pic_ID' => $row3['pic_ID'],
			'content_ID' => $row3['content_ID'],
			'pic_path' => $row3['pic_path'],
			'pic_desc' => $row3['pic_desc'],
			'pic_link' => $row3['pic_link']
		);
	}
		
	
	
	echo stripslashes(json_encode($timeline));
}
fetchData();
?>