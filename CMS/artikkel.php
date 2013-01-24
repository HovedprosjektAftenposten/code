<?php
	
	header("Content-Type: application/json");
	header("access-control-allow-origin: *");
	
	$connect = mysql_connect("localhost", "root", ""); //kobler til server (server, brukernavn, passord)
		if (!$connect) {
			die('Could not connect: ' . mysql_error()); //hvis tilkoblingen ikke blir gjennomført blir det feilmelding
		}
	//	echo '<p style="color: green;">Connected</p>'; //hvis tilkoblingen er OK, skrives Connected ut på skjermen
		mysql_select_db("hovedprosjekt", $connect); //velger database/schema
	
	function User() {
	
		$get = $_GET['tidslinje'];
	
	    $arr = array();
	    
	    $query = "SELECT * FROM content_table";
	
	    $sql = mysql_query($query);
	    
	   		while($obj = mysql_fetch_object($sql)) { // henter ut objekter fra tabellen
	   			$arr[] = $obj; 			// legger objektene i arrayet som ble opprettet over
	   		}
	   		    
	
	    echo json_encode($arr);
	    echo $sql;
	}
	User();
	
?>
