<?php

/// IN PROGRESS!!!!



$connect = mysql_connect("localhost", "root", ""); //kobler til server (server, brukernavn, passord)
	if (!$connect) {
		die('Could not connect: ' . mysql_error()); //hvis tilkoblingen ikke blir gjennomført blir det feilmelding
	}
//	echo '<p style="color: green;">Connected</p>'; //hvis tilkoblingen er OK, skrives Connected ut på skjermen
	mysql_select_db("hovedprosjekt", $connect); //velger database/schema

	$get = $_GET['id'];
	
	$sql = "SELECT * FROM content_table WHERE tl_ID = 1 ORDER BY content_date DESC";
	
	$result = mysql_query($sql);
	
	while($row = mysql_fetch_array($result)) {

		$content = $row['content_content'];
		$trimContent = substr($content, 0, 30).'...';
		/*
echo "<div class='article' onclick='hentArtikkelInnhold(".$row['tl_ID'].",".$row['content_ID'].")'>";
		echo "<div class='articleTitle'>".$row['content_title']."</div>"."<div class='articleDate'>".$row['content_date']."</div>"."</br>"."<div class='articleContent'>".$trimContent."</div>";
*/
		
		if($row['content_status'] == 0) {
			echo "<div class='nu-timeline-cms-article article". $row['content_ID']."' onclick='hentArtikkelInnhold(".$row['tl_ID'].",".$row['content_ID'].")'>";
			echo "<div class='nu-timeline-cms-articleTitle'>".$row['content_title']."</div>"."<div class='nu-timeline-cms-contentLiveStatus nu-timeline-cms-textInactive'>Draft</div>"."<div class='nu-timeline-cms-articleDate'>".$row['content_date']."</div>"."<div class='nu-timeline-cms-articleContent'>".$trimContent."</div>";
			echo "</div>";
		}
		else {
			echo "<div class='nu-timeline-cms-article article". $row['content_ID']."' onclick='hentArtikkelInnhold(".$row['tl_ID'].",".$row['content_ID'].")'>";
			echo "<div class='nu-timeline-cms-articleTitle'>".$row['content_title']."</div>"."<div class='nu-timeline-cms-contentLiveStatus nu-timeline-cms-textActive'>Published</div>"."<div class='nu-timeline-cms-articleDate'>".$row['content_date']."</div>"."<div class='nu-timeline-cms-articleContent'>".$trimContent."</div>";
			echo "</div>";
		}

	}

?>