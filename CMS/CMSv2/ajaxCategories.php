<?php
	
	$connect = mysql_connect("localhost", "root", ""); //kobler til server (server, brukernavn, passord)
		if (!$connect) {
			die('Could not connect: ' . mysql_error()); //hvis tilkoblingen ikke blir gjennomført blir det feilmelding
		}
//	echo '<p style="color: green;">Connected</p>'; //hvis tilkoblingen er OK, skrives Connected ut på skjermen
	mysql_select_db("aftenposten", $connect); //velger database/schema

	if(isset($_REQUEST['category'])){
		mysql_query("UPDATE content_table SET content_category = '".$_REQUEST['category']."' WHERE content_ID = '".$_REQUEST['article']."'");
	}
	
	
	$result = mysql_query("SELECT * FROM timeline_table WHERE tl_ID = '".$_REQUEST['id']."'");
	$print = mysql_fetch_array($result);
	
	echo "<ul id='nu-timeline-cms-tlInfoListCategories'>";
	
	if(!empty($print['tl_category1'])){
		if(!empty($print['tl_category1'])){
		echo "<li><div class='nu-timeline-cms-showCategoriesNewLine en'></div><span class='nu-timeline-cms-labelCategories'>".$print['tl_category1']."</span></li>"; 
		}
		if(!empty($print['tl_category2'])){
		echo "<li><div class='nu-timeline-cms-showCategoriesNewLine to'></div><span class='nu-timeline-cms-labelCategories'>".$print['tl_category2']."</span></li>"; 
		}
		if(!empty($print['tl_category3'])){
		echo "<li><div class='nu-timeline-cms-showCategoriesNewLine tre'></div><span class='nu-timeline-cms-labelCategories'>".$print['tl_category3']."</span></li>";
		}
		if(!empty($print['tl_category4'])){
		echo "<li><div class='nu-timeline-cms-showCategoriesNewLine fire'></div><span class='nu-timeline-cms-labelCategories'>".$print['tl_category4']."</span></li>"; 
		}
		if(!empty($print['tl_category5'])){
		echo "<li><div class='nu-timeline-cms-showCategoriesNewLine fem'></div><span class='nu-timeline-cms-labelCategories'>".$print['tl_category5']."</span></li>"; 
		}
		if(!empty($print['tl_category6'])){
		echo "<li><div class='nu-timeline-cms-showCategoriesNewLine seks'></div><span class='nu-timeline-cms-labelCategories'>".$print['tl_category6']."</span></li>"; 
		}
	}
	echo "</ul>";
?>