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

	$timelineQuery = mysql_query("SELECT * FROM timeline_table") or die(mysql_error());
	$contentQuery = mysql_query("SELECT * FROM content_table") or die(mysql_error());
	$picQuery = mysql_query("SELECT * FROM pic_table") or die(mysql_error());

	$timeline = array();
	
	while($row = mysql_fetch_assoc($timelineQuery)){
		$timeline['tl_ID'] = $row['tl_ID'];
		$timeline['tl_name'] = $row['tl_name'];
		$timeline['tl_date'] = $row['tl_date'];
		$timeline['tl_desc'] = $row['tl_desc'];
	
		while($row2 = mysql_fetch_assoc($contentQuery)){
			$timeline['content'] = array(
				'content_ID' => $row2['content_ID'],
				'tl_ID' => $row2['tl_ID'],
				'content_time' => $row2['content_time'],
				'content_date' => $row2['content_date'],
				'content_title' => $row2['content_title'],
				'content_content' => $row2['content_content'],
				'content_category' => $row2['content_category'],
				'content_mapLat' => $row2['content_mapLat'],
				'content_mapLng' => $row2['content_mapLng'],
				'content_zoomLvl' => $row2['content_zoomLvl']
			);
			
			while($row3 = mysql_fetch_assoc($picQuery)){
				$timeline['pictures'][] = array(
					'pic_ID' => $row3['pic_ID'],
					'content_ID' => $row3['content_ID'],
					'pic_path' => $row3['pic_path'],
					'pic_desc' => $row3['pic_desc'],
					'pic_link' => $row3['pic_link']
				);
			}
		}
	}
	
	echo stripslashes(json_encode($timeline));
}
fetchData();
?>