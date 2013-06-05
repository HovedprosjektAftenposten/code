<?php

	header ('content-type:text/html;charset=utf-8');
	$connect = mysql_connect("localhost", "root", "root"); //kobler til server (server, brukernavn, passord)
		if (!$connect) {
			die('Could not connect: ' . mysql_error()); //hvis tilkoblingen ikke blir gjennomført blir det feilmelding
		}
	mysql_select_db("aftenposten", $connect); //velger database/schema
	mysql_query ('SET NAMES utf8');


	$result = mysql_query("SELECT * FROM content_table WHERE content_ID = '".$_REQUEST['article']."'");
	$result2 = mysql_query("SELECT * FROM category_table WHERE tl_ID = '".$_REQUEST['id']."'");
	$print = mysql_fetch_array($result);
	$print2 = mysql_fetch_array($result2);
	
	echo "<option disabled selected>Velg kategori..</option>";

	if (!empty($print2['category1'])){
		if($print['content_category'] == $print2['category1']) {
			echo "<option selected='selected'>".$print2['category1']."</option>";
		}else{
			echo "<option>".$print2['category1']."</option>";
		}
	}
	if (!empty($print2['category2'])){
		if($print['content_category'] == $print2['category2']) {
			echo "<option selected='selected'>".$print2['category2']."</option>";
		}else{
			echo "<option>".$print2['category2']."</option>";
		}
	}
	if (!empty($print2['category3'])){
		if($print['content_category'] == $print2['category3']) {
			echo "<option selected='selected'>".$print2['category3']."</option>";
		}else{
			echo "<option>".$print2['category3']."</option>";
		}
	}
	if (!empty($print2['category4'])){
		if($print['content_category'] == $print2['category4']) {
			echo "<option selected='selected'>".$print2['category4']."</option>";
		}else{
			echo "<option>".$print2['category4']."</option>";
		}
	}
	if (!empty($print2['category5'])){
		if($print['content_category'] == $print2['category5']) {
			echo "<option selected='selected'>".$print2['category5']."</option>";
		}else{
			echo "<option>".$print2['category5']."</option>";
		}
	}
	if (!empty($print2['category6'])){
		if($print['content_category'] == $print2['category6']) {
			echo "<option selected='selected'>".$print2['category6']."</option>";
		}else{
			echo "<option>".$print2['category6']."</option>";
		}
	}
	
?>

