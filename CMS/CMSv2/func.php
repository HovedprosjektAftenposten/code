<?php
include('connect.inc.php');

//function som skriver ut alle tidslinjer på index.php. Hver tidslinje får en onclick som er satt til tl_ID. Onclick kaller på js script i index.php, som igjen setter urlen til edit.php?id= tl_ID.
//På denne måten kan alt innhold i de forskjellige tidslinjene skrives ut på edit.php siden.
function getTimeline() {
			
	$sql = "SELECT * FROM timeline_table";

	$result = mysql_query($sql);
	

	while($row = mysql_fetch_array($result)) {
		echo "<tr class='timelineLine' id='".$row['tl_ID']."' onclick='hentTidslinje(".$row['tl_ID'].")'>";
		echo "<td class='first'>".$row['tl_ID']."</td>"."<td class='second'>".$row['tl_name']."</td>"."<td class='third'>".$row['tl_date']."</td>"."<td class='last'></td>";
		echo "</tr>";
	}
}
//funskjon som finner riktig navn på tidslinje. Brukes i "meny teksten" øverst på edit.php. Bruker $_GET['id'] fra url.
function getTimelineName(){
	
	$get = $_GET['id'];
	
	$sql = "SELECT tl_name FROM timeline_table WHERE tl_ID = $get";
	
	$result = mysql_query($sql);
	
	while($row = mysql_fetch_array($result)) {
		echo $row['tl_name'];
	}
	
}

//funksjon som henter ut alt fra content_table hvor tl_ID = id i url. Lager div'er med innholdet fra content_table. Hver div får en onclick som kaller på et js script i edit.php.
//onclicken sender med seg tl_ID og content_ID som bruke i urlen til å håndtere $_GET.
function getArticle() {
	
	$get = $_GET['id'];
	
	$sql = "SELECT * FROM content_table WHERE tl_ID = $get";
	
	$result = mysql_query($sql);
	
	
	while($row = mysql_fetch_array($result)) {

		$content = $row['content_content'];
		$trimContent = substr($content, 0, 200).'...';
		echo "<div class='article' onclick='hentArtikkelInnhold(".$row['tl_ID'].",".$row['content_ID'].")'>";
		echo "<div class='articleTitle'>".$row['content_title']."</div>"."<div class='articleDate'>".$row['content_date']."</div>"."</br>"."<div class='articleContent'>".$trimContent."</div>";

		echo "</div>";

	}
	/* "<div class='liveStatus'>".liveStatus()."</div>". */
}


function getPicUrl(){
	
	$get = $_GET['url'];
	
	echo "http://test/".$get."/";
}

function preview() {
	$post = $_POST['test'];
	
	echo "<img src='".$post."' />";
}

//function som henter verdien av article i fra url'en, og bruker denne til å fylle input-felter.
function fillInputs() {

	$get = $_GET['article'];
	
	if($get >= 1) {
	
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
		
			
		echo "<form method='post' id='editForm'>
			<label>Overskrift:</label><input type='text' name='overskrift' id='overskrift' value='$content_title' /></br>
			<label>Dato:</label><input type='date' name='dato' id='dato' value='$content_date' /></br>
			<label>Tid:</label><input type='time' name='tid' id='tid' value='$content_time' /></br>
			<label>Tekst:</label></br><textarea cols='50' rows='20' name='text' id='text'>$content_content</textarea></form>";
		//må posisjoneres!!!!!!
		echo "<div class='liveStatus'>".liveStatus()."</div>";
			
		echo "<label>Bilder:</label><div id='pop'></div>
						<div id='fade'>
							<div id='popWindow'>
								<form action='' method='get'>
								Skriv inn Escenic ID: <input type='text' name='test'/> <input type='submit' value='OK' /> </form>
								
								<a href='#' id='close'>close</a>
							</div>
						</div>";
	}
		
}
//funskjon som sjekker om hendelsen er publisert eller om det kun er en kladd. Rødt kryss for kladd(draft) og grønn v for published.
function liveStatus() {
	
	$get = $_GET['article'];
	
	$sql = "SELECT * FROM content_table WHERE content_ID = $get";
	
	$result = mysql_query($sql);
	
	while($print = mysql_fetch_array($result)){
		
		if($print['content_status'] == 0) {
			echo "<img src='img/draft.png'></img>";
		}
		else {
			echo "<img src='img/published.png'></img>";
		}
	}
}

?>

















