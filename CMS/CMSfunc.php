<?php
include('connect.inc.php');

function getTitle() {
			
	$sql = "SELECT * FROM content_table";

	$result = mysql_query($sql);
	
//	$test = mysql_fetch_array($result);
//
//	for($i = 0; $i <= sizeof($test); $i++) {
//		echo "<p>$test[$i]</p>";
//		echo "<p>$test[$i]</p>";
//	};
	$inc = 1;

	echo "<table>";
	while($row = mysql_fetch_array($result)) {
		echo "<tr>";
		echo "<td><a href='?id=$inc' >".$row['content_title']."</a></td>";
		echo "</tr>";
		$inc++;
	}
	echo "</table>";
	


//	$print = mysql_fetch_array($result);
	
	
	
//	$content_ID = $print['content_ID'];
//	$tl_ID = $print['tl_ID'];
//	$content_time = $print['content_time'];
//	$content_date = $print['content_date'];
//	$content_title = $print['content_title'];
//	$content_content = $print['content_content'];
//	$content_category = $print['content_category'];
//	$content_mapLat = $print['content_mapLat'];
//	$content_mapLng = $print['content_mapLng'];
//	$content_zoomLvl = $print['content_zoomLvl'];
	
	
	
	
	
//	$sql = 'SELECT * FROM pic_table'; //spørring til annen tabell
//	
//	$result = mysql_query($sql); //sender den andre spørringen
//	
//	$print = mysql_fetch_array($result); //lager array av variablen $result2
//	
//	$picID = $print['pic_ID']; //henter ut spesifike felter fra tabellen
//	$contentID = $print['content_ID'];
//	$picPath = $print['pic_path'];
//	$picDesc = $print['pic_desc'];
//	$picLink = $print['pic_link'];
}

function getArticle() {

	$get = $_GET['id'];
	
	$sql = "SELECT * FROM content_table WHERE content_ID = $get";
//	$update = "UPDATE content_table SET content_ID = $cID, tl_ID = $tID, content_time = $time, content_date = $date, content_title = $title, content_content = $content WHERE content_ID = $get";
	
	$result = mysql_query($sql);
	
	$print = mysql_fetch_array($result);
	

	$content_ID = $print['content_ID'];
	$tl_ID = $print['tl_ID'];
	$content_time = $print['content_time'];
	$content_date = $print['content_date'];
	$content_title = $print['content_title'];
	$content_content = $print['content_content'];
//		$content_category = $print['content_category'];
//		$content_mapLat = $print['content_mapLat'];
//		$content_mapLng = $print['content_mapLng'];
//		$content_zoomLvl = $print['content_zoomLvl'];
	
	echo "<form method='post' action='CMSfunc.php'>
	  Content ID: <input type='text' name='cID' value='$content_ID'></input></br>",
	 "Timeline ID: <input type='text' name='tID' value='$tl_ID'></input></br>",
	 "Time: <input type='text' name='time' value='$content_time'></input></br>",
	 "Date: <input type='text' name='date' value='$content_date'></input></br>",
	 "Tittel: <input type='text' name='title' value='$content_title'></input></br></br>",
	 "<textarea rows='15' cols='39' name='content' style='resize: none'>$content_content</textarea></br>",
	 "<input type='submit' value='Oppdater'></input><input type='reset' value='Angre alt'></input></form>";
	 
//	 $cID = $_POST['cID'];
//	 $tID = $_POST['tID'];
//	 $time = $_POST['time'];
//	 $date = $_POST['date'];
//	 $title = $_POST['title'];
//	 $content = $_POST['content'];
//	 
//	 $updateArticle = mysql_query($update);
}

function updateArticle() {
	
	$cID = $_POST['cID'];
	$tID = $_POST['tID'];
	$time = $_POST['time'];
	$date = $_POST['date'];
	$title = $_POST['title'];
	$content = $_POST['content'];
	
	$get = $_GET['id'];
	
	$sql = "UPDATE content_table SET content_ID = $cID, tl_ID = $tID, content_time = $time, content_date = $date, content_title = $title, content_content = $content WHERE content_ID = $get";
	
	$result = mysql_query($sql);
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}

?>