<!--Denne filen brukes for å få tilgang til alle feltene i tabellen vid_table.
Bruk include(vid_table.inc.php); etter include(connect.inc.php); for å få tilgang.-->

<?php
	$sql = 'SELECT * FROM vid_table'; //spørring til annen tabell
	
	$result = mysql_query($sql); //sender den andre spørringen
	
	$print = mysql_fetch_array($result); //lager array av variablen $result2
	
	$vidID = $print['vid_ID']; //henter ut spesifike felter fra tabellen
	$contentID = $print['content_ID'];
	$vidPath = $print['vid_path'];
	$vidDesc = $print['vid_desc'];
	$vidLink = $print['vid_link'];

?>