<!--Denne filen brukes for å koble til serveren og databasen. 
Inkluderes i hver fil ved å bruke include('connect.php'); i head.-->

<?php
	$connect = mysql_connect("svendsen-it.no.mysql", "svendsen_it_no", "A4K3KGWX"); //kobler til server (server, brukernavn, passord)
	if (!$connect) {
		die('Could not connect: ' . mysql_error()); //hvis tilkoblingen ikke blir gjennomført blir det feilmelding
	}
//	echo '<p style="color: green;">Connected</p>'; //hvis tilkoblingen er OK, skrives Connected ut på skjermen
	mysql_select_db("svendsen_it_no", $connect); //velger database/schema
?>