<?php 

header("Content-Type: application/json");
header("access-control-allow-origin: *");

$connect = mysql_connect("svendsen-it.no.mysql", "svendsen_it_no", "A4K3KGWX"); //kobler til server (server, brukernavn, passord)
	if (!$connect) {
		die('Could not connect: ' . mysql_error()); //hvis tilkoblingen ikke blir gjennomført blir det feilmelding
	}
//	echo '<p style="color: green;">Connected</p>'; //hvis tilkoblingen er OK, skrives Connected ut på skjermen
	mysql_select_db("svendsen_it_no", $connect); //velger database/schema

function User() {

	$get = $_GET['tidslinje'];

    $arr = array();
    
    $query = "SELECT content_table.*, pic_table.pic_path FROM content_table, pic_table WHERE (pic_table.content_ID = content_table.content_ID) AND (content_table.tl_ID = $get) ORDER BY content_table.content_date ASC";
    $query2 = "SELECT pic_path FROM pic_table";

    $sql = mysql_query($query);
    $sql2 = mysql_query($query2);
    
   		while($obj = mysql_fetch_object($sql)) { // henter ut objekter fra tabellen
   			$arr[] = $obj; 			// legger objektene i arrayet som ble opprettet over
   		}
   		while($obj2 = mysql_fetch_object($sql2)) {
   			$arr2[] = $obj2;
   		}
   		    

    echo json_encode($arr);
}
User();
?>