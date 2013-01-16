<!--Denne filen brukes for å få tilgang til alle feltene i tabellen cal_table.
Bruk include(cal_table.inc.php); etter include(connect.inc.php); for å få tilgang.-->

<?php
	$sql = 'SELECT * FROM cal_table'; //spørring til annen tabell
	
	$result = mysql_query($sql); //sender den andre spørringen
	
	$print = mysql_fetch_array($result); //lager array av variablen $result2
	
	$calID = $print['cal_ID']; //henter ut spesifike felter fra tabellen
	$calName = $print['cal_name'];
	$calDays = $print['cal_days'];

?>