<?php
	// Script that fills the article list in edit.php. 

	//
	
	//
	
	header ('content-type:text/html;charset=utf-8');
	// connectionstring start
	$connect = mysql_connect("localhost", "root", "root");
	if (!$connect) {
		die('Could not connect: ' . mysql_error());
	}

	mysql_select_db("aftenposten", $connect);
	mysql_query ('SET NAMES utf8');
	// connectionstring end
	
	$result = mysql_query("SELECT * FROM content_table WHERE tl_ID = '".$_GET['id']."' ORDER BY content_date DESC");
	
	// adds articles to the list, and gives the border the right color. Blue if its a draft, and green if its published.
	if(!empty($result)){
		while($row = mysql_fetch_array($result)) {
				
			if($row['content_status'] == 0) {
				
				echo "<div style='border-left: 5px solid blue' class='nu-timeline-cms-article article". $row['content_ID']."' onclick='fetchArticleContent(".$row['tl_ID'].",".$row['content_ID'].")' >";
				echo "<div class='nu-timeline-cms-articleTitle'>".$row['content_title']."</div>"."<div class='nu-timeline-cms-articleDate'>".$row['content_date']."</div>"."<div class='nu-timeline-cms-articleContent'>".$row['content_content']."</div>";
				echo "</div>";
			}
			else {
				echo "<div style='border-left: 5px solid green' class='nu-timeline-cms-article article". $row['content_ID']."' onclick='fetchArticleContent(".$row['tl_ID'].",".$row['content_ID'].")'>";
				echo "<div class='nu-timeline-cms-articleTitle'>".$row['content_title']."</div>"."<div class='nu-timeline-cms-articleDate'>".$row['content_date']."</div>"."<div class='nu-timeline-cms-articleContent'>".$row['content_content']."</div>";
				echo "</div>";
			}
	
		}
	}

?>