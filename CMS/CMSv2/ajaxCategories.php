<?php
	
	$connect = mysql_connect("localhost", "root", "root"); //kobler til server (server, brukernavn, passord)
		if (!$connect) {
			die('Could not connect: ' . mysql_error()); //hvis tilkoblingen ikke blir gjennomført blir det feilmelding
		}
	mysql_select_db("aftenposten", $connect); //velger database/schema

	
	if(isset($_REQUEST['category'])){
		mysql_query("UPDATE content_table SET content_category = '".$_REQUEST['category']."' WHERE content_ID = '".$_REQUEST['article']."'");
	}
	
	$result = mysql_query("SELECT * FROM category_table WHERE tl_ID = '".$_REQUEST['id']."'");
	$print = mysql_fetch_array($result);
	
	echo "<ul id='nu-timeline-cms-tlInfoListCategories'>";
	
	if(!empty($print['category1'])){
		echo "<li><input type='text' id='nu-timeline-cms-tlInfoCategory1' value='".$print['category1']."'></input><input type='text' class='nu-timeline-cms-colorPicker'/><div class='nu-timeline-cms-tlFormDeleteCategoryBtn' id='categoryBtn1'></div></li>";
	}
	if(!empty($print['category2'])){
		echo "<li><input type='text' id='nu-timeline-cms-tlInfoCategory2' value='".$print['category2']."'></input><input type='text' class='nu-timeline-cms-colorPicker'/><div class='nu-timeline-cms-tlFormDeleteCategoryBtn' id='categoryBtn2'></div></li>";
	}
	if(!empty($print['category3'])){
		echo "<li><input type='text' id='nu-timeline-cms-tlInfoCategory3' value='".$print['category3']."'></input><input type='text' class='nu-timeline-cms-colorPicker'/><div class='nu-timeline-cms-tlFormDeleteCategoryBtn' id='categoryBtn3'></div></li>";
	}
	if(!empty($print['category4'])){
		echo "<li><input type='text' id='nu-timeline-cms-tlInfoCategory4' value='".$print['category4']."'></input><input type='text' class='nu-timeline-cms-colorPicker'/><div class='nu-timeline-cms-tlFormDeleteCategoryBtn' id='categoryBtn4'></div></li>";
	}
	if(!empty($print['category5'])){
		echo "<li><input type='text' id='nu-timeline-cms-tlInfoCategory5' value='".$print['category5']."'></input><input type='text' class='nu-timeline-cms-colorPicker'/><div class='nu-timeline-cms-tlFormDeleteCategoryBtn' id='categoryBtn5'></div></li>";
	}
	if(!empty($print['category6'])){
		echo "<li><input type='text' id='nu-timeline-cms-tlInfoCategory6' value='".$print['category6']."'></input><input type='text' class='nu-timeline-cms-colorPicker'/><div class='nu-timeline-cms-tlFormDeleteCategoryBtn' id='categoryBtn6'></div></li>";
	}
	echo "</ul>";
?>