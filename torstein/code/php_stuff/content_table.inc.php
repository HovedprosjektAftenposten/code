<!--Denne filen brukes for å få tilgang til alle feltene i tabellen content_table.
Bruk include(content_table.inc.php); etter include(connect.inc.php); for å få tilgang.-->

<?php
	$sql = 'SELECT * FROM content_table'; //spørring til tabell
	
	$result = mysql_query($sql); //sender spørringen og lagrer resultatet i variablen $result
	
	$print = mysql_fetch_array($result); //lager et array av variablen $result
	
	$contentID = $print['content_ID']; //henter ut spesifike felter fra tabellen
	$contentTime = $print['content_time'];
	$contentTitle = $print['content_title'];
	$contentCategory = $print['content_category'];
	$contentMapLat = $print['content_mapLat'];
	$contentMapLng = $print['content_mapLng'];
	$contentZoomLvl = $print['content_zoomLvl'];
	$picID = $print['pic_ID'];
	$contentContent = $print['content_content'];

?>