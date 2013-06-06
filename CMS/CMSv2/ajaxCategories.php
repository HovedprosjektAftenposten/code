<?php
	// Script for selecting category for an article + printing of the categories to edit.php
	
	// 
	
	//
	
	header ('content-type:text/html;charset=utf-8');
	
	// connectionstring for connection to the database
	$connect = mysql_connect("localhost", "root", "root");
		if (!$connect) {
			die('Could not connect: ' . mysql_error()); 
		}
	mysql_select_db("aftenposten", $connect); 
	mysql_query ('SET NAMES utf8');
	// end connectionstring
	
	// selecting a category for an article
	if(isset($_REQUEST['category'])){
		mysql_query("UPDATE content_table SET content_category = '".htmlentities($_REQUEST['category'])."' WHERE content_ID = '".$_REQUEST['article']."'");
	}
	
	$result = mysql_query("SELECT * FROM category_table WHERE tl_ID = '".$_REQUEST['id']."'");
	$print = mysql_fetch_array($result);
	
	echo "<ul id='nu-timeline-cms-tlInfoListCategories'>"; 
	
	// printing of categories to edit.php
	if(!empty($print['category1'])){
		echo "<li><input type='text' id='nu-timeline-cms-tlInfoCategory1' value='".$print['category1']."'></input><input type='text' class='nu-timeline-cms-colorPicker color1'/><div class='nu-timeline-cms-tlFormDeleteCategoryBtn' id='categoryBtn1'></div><input type='hidden' id='hiddenColor1' value='".$print['color1']."'></input></li>";
	}
	if(!empty($print['category2'])){
		echo "<li><input type='text' id='nu-timeline-cms-tlInfoCategory2' value='".$print['category2']."'></input><input type='text' class='nu-timeline-cms-colorPicker color2'/><div class='nu-timeline-cms-tlFormDeleteCategoryBtn' id='categoryBtn2'></div><input type='hidden' id='hiddenColor2' value='".$print['color2']."'></input></li>";
	}
	if(!empty($print['category3'])){
		echo "<li><input type='text' id='nu-timeline-cms-tlInfoCategory3' value='".$print['category3']."'></input><input type='text' class='nu-timeline-cms-colorPicker color3'/><div class='nu-timeline-cms-tlFormDeleteCategoryBtn' id='categoryBtn3'></div><input type='hidden' id='hiddenColor3' value='".$print['color3']."'></input></li>";
	}
	if(!empty($print['category4'])){
		echo "<li><input type='text' id='nu-timeline-cms-tlInfoCategory4' value='".$print['category4']."'></input><input type='text' class='nu-timeline-cms-colorPicker color4'/><div class='nu-timeline-cms-tlFormDeleteCategoryBtn' id='categoryBtn4'></div><input type='hidden' id='hiddenColor4' value='".$print['color4']."'></input></li>";
	}
	if(!empty($print['category5'])){
		echo "<li><input type='text' id='nu-timeline-cms-tlInfoCategory5' value='".$print['category5']."'></input><input type='text' class='nu-timeline-cms-colorPicker color5'/><div class='nu-timeline-cms-tlFormDeleteCategoryBtn' id='categoryBtn5'></div><input type='hidden' id='hiddenColor5' value='".$print['color5']."'></input></li>";
	}
	if(!empty($print['category6'])){
		echo "<li><input type='text' id='nu-timeline-cms-tlInfoCategory6' value='".$print['category6']."'></input><input type='text' class='nu-timeline-cms-colorPicker color6'/><div class='nu-timeline-cms-tlFormDeleteCategoryBtn' id='categoryBtn6'></div><input type='hidden' id='hiddenColor6' value='".$print['color6']."'></input></li>";
	}
	echo "</ul>";
	
	// checks if the maximum number of categories are reached
	if(isset($_REQUEST['hiddenCategory'])){
		if($print['category6'] > 0){
			echo "full";
		}else{
			echo "";
		}
	
	}
?>