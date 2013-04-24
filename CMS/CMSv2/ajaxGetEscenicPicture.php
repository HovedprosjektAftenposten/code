<?php
	$connect = mysql_connect("localhost", "root", "root"); //kobler til server (server, brukernavn, passord)
			if (!$connect) {
				die('Could not connect: ' . mysql_error()); //hvis tilkoblingen ikke blir gjennomført blir det feilmelding
			}
		mysql_select_db("aftenposten", $connect); //velger database/schema
		
	$query = mysql_query("SELECT * FROM media_table WHERE content_ID = '10'");
	$print = mysql_fetch_array($query);
		
	if(!empty($_REQUEST['escenicID'])){
	$picture = "http://apweb.medianorge.no/incoming/article".$_REQUEST['escenicID'].".ece/ALTERNATES/".$_REQUEST['cropVersion']."/afp000513586-2n8PjK6qV3.jpg";
	
	mysql_query("UPDATE media_table SET media_data = '".$picture."' WHERE content_ID = '10'");
	}
	
	echo "<img src='".$print['media_data']."'></img>";

?>