<?php
	header ('content-type:text/html;charset=utf-8');
	$connect = mysql_connect("localhost", "root", "root"); //kobler til server (server, brukernavn, passord)
	if (!$connect) {
		die('Could not connect: ' . mysql_error()); //hvis tilkoblingen ikke blir gjennomført blir det feilmelding
	}
//	echo '<p style="color: green;">Connected</p>'; //hvis tilkoblingen er OK, skrives Connected ut på skjermen
	mysql_select_db("aftenposten", $connect); //velger database/schema
	mysql_query ('SET NAMES utf8');

	$query = mysql_query("SELECT tl_name FROM timeline_table WHERE tl_ID = '".$_REQUEST['id']."'");
	$result = mysql_fetch_array($query);
	
	if(strlen($result['tl_name']) > 20){
				$trimName = substr($result['tl_name'], 0, 20).'...';
				echo "<a href='index.php'>Tidslinjer</a> > ".$trimName;
			}else{
				$trimName = $result['tl_name'];
				echo "<a href='index.php'>Tidslinjer</a> > ".$trimName;
			}
	
?>