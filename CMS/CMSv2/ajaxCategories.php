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
		if(!empty($print['category1'])){
		/* echo "<li><div class='nu-timeline-cms-showCategoriesNewLine en'></div><span class='nu-timeline-cms-labelCategories'>".$print['tl_category1']."</span></li>"; */ 
		echo "<li><input type='text' value='".$print['category1']."'></input><input type='text' class='nu-timeline-cms-colorPicker'/><div class='nu-timeline-cms-tlFormDeleteCategoryBtn'></div></li>";
		}
		if(!empty($print['category2'])){
		/* echo "<li><div class='nu-timeline-cms-showCategoriesNewLine to'></div><span class='nu-timeline-cms-labelCategories'>".$print['tl_category2']."</span></li>"; */ 
		echo "<li><input type='text' value='".$print['category2']."'></input><input type='text' class='nu-timeline-cms-colorPicker'/><div class='nu-timeline-cms-tlFormDeleteCategoryBtn'></div></li>";
		}
		if(!empty($print['category3'])){
		/* echo "<li><div class='nu-timeline-cms-showCategoriesNewLine tre'></div><span class='nu-timeline-cms-labelCategories'>".$print['tl_category3']."</span></li>"; */
		echo "<li><input type='text' value='".$print['category3']."'></input><input type='text' class='nu-timeline-cms-colorPicker'/><div class='nu-timeline-cms-tlFormDeleteCategoryBtn'></div></li>";
		}
		if(!empty($print['category4'])){
		/* echo "<li><div class='nu-timeline-cms-showCategoriesNewLine fire'></div><span class='nu-timeline-cms-labelCategories'>".$print['tl_category4']."</span></li>";  */
		echo "<li><input type='text' value='".$print['category4']."'></input><input type='text' class='nu-timeline-cms-colorPicker'/><div class='nu-timeline-cms-tlFormDeleteCategoryBtn'></div></li>";
		}
		if(!empty($print['category5'])){
		/* echo "<li><div class='nu-timeline-cms-showCategoriesNewLine fem'></div><span class='nu-timeline-cms-labelCategories'>".$print['tl_category5']."</span></li>";  */
		echo "<li><input type='text' value='".$print['category5']."'></input><input type='text' class='nu-timeline-cms-colorPicker'/><div class='nu-timeline-cms-tlFormDeleteCategoryBtn'></div></li>";
		}
		if(!empty($print['category6'])){
		/* echo "<li><div class='nu-timeline-cms-showCategoriesNewLine seks'></div><span class='nu-timeline-cms-labelCategories'>".$print['tl_category6']."</span></li>";  */
		echo "<li><input type='text' value='".$print['category6']."'></input><input type='text' class='nu-timeline-cms-colorPicker'/><div class='nu-timeline-cms-tlFormDeleteCategoryBtn'></div></li>";
		}
	}
	echo "</ul>";
?>