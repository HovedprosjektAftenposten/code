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

	$timelineArray = array();
    $contentArray = array();
    $picArray = array();

	$timelineQuery = "SELECT * FROM timeline_table";
    $contentQuery = "SELECT * FROM content_table";
    $picQuery = "SELECT * FROM pic_table";
    
/*
    $testQuery = "SELECT timeline_table.*, content_table.*, pic_table.* FROM timeline_table, content_table, pic_table WHERE timeline_table.tl_ID = content_table.tl_ID AND pic_table.content_ID = content_table.content_ID";
    
    $testSql = mysql_query($testQuery) or die(mysql_error());
*/
    
	$sql = mysql_query($timelineQuery) or die(mysql_error()); 
    $sql2 = mysql_query($contentQuery) or die(mysql_error());
    $sql3 = mysql_query($picQuery) or die(mysql_error());
      
   	while($row = mysql_fetch_assoc($sql)) { // henter ut objekter fra tabellen 
   		$timelineArray[] = $row; 			// legger objektene i arrayet som ble opprettet over
   	}
   	while($row2 = mysql_fetch_assoc($sql2)) {
   		$contentArray[] = $row2;
   	}
   	while($row3 = mysql_fetch_assoc($sql3)) {
   		$picArray[] = $row3;
   	}  
   	 	
   	$mainArray = array(
		'timeline' => $timelineArray,
		'content' => $contentArray,
		'pictures' => $picArray,
	);  
	
	echo stripslashes(json_encode($mainArray));
}

fetchData();

?>