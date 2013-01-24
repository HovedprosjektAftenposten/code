<?php
	include('connect.inc.php'); //inkluderer connectionstring fra connect.inc.php
	
	$arr = array(); 			//oppretter et array
	
	$sql = mysql_query('SELECT * FROM content_table'); //oppretter en sql-query
	
	while($obj = mysql_fetch_object($sql)) { // henter ut objekter fra tabellen
		$arr[] = $obj; 			// legger objektene i arrayet som ble opprettet over
	}
	
	$ut = '{"members":'.json_encode($arr).'}'; // skriver ut arrayet med formatering og ferdig json encodet
	
	echo $ut; 					// skriver ut på skjermen det som blir skrevet til fil
	
	$my_file = 'test.json'; 	//oppretter navnet på filen det skal skrives til
	$handle = fopen($my_file, 'w') or die('Cannot open file:  '.$my_file); // oppretter selve filen med riktig navn, evt åpner filen hvis den allerede eksisterer
	$data = $ut; 				// lagrer dataene som skal skrives i filen i en ny variabel
	fwrite($handle, $data); 	// åpner og skriver dataene inn i filen
	fclose($handle); 			// lukker filen
?>