<!--Denne filen brukes for å få tilgang til alle feltene i tabellen timeline_table.
Bruk include(timeline_table.inc.php); etter include(connect.inc.php); for å få tilgang.-->

<?php
	$sql = 'SELECT * FROM timeline_table'; //spørring til annen tabell
	
	$result = mysql_query($sql); //sender den andre spørringen
	
	$print = mysql_fetch_array($result); //lager array av variablen $result2
	
	$tlID = $print['tl_ID']; //henter ut spesifike felter fra tabellen
	$tlName = $print['tl_name'];
	$tlDate = $print['tl_date'];
	$tlDesc = $print['tl_desc'];
	$contentID = $print['content_ID'];
?>