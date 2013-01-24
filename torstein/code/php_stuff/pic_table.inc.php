<!--Denne filen brukes for å få tilgang til alle feltene i tabellen pic_table.
Bruk include(oic_table.inc.php); etter include(connect.inc.php); for å få tilgang.-->

<?php
	$sql = 'SELECT * FROM pic_table'; //spørring til annen tabell
	
	$result = mysql_query($sql); //sender den andre spørringen
	
	$print = mysql_fetch_array($result); //lager array av variablen $result2
	
	$picID = $print['pic_ID']; //henter ut spesifike felter fra tabellen
	$contentID = $print['content_ID'];
	$picPath = $print['pic_path'];
	$picDesc = $print['pic_desc'];
	$picLink = $print['pic_link'];
?>