<?php

include('connect.inc.php');

//function som skriver ut alle tidslinjer på index.php. Hver tidslinje får en onclick som er satt til tl_ID. Onclick kaller på js script i index.php, som igjen setter urlen til edit.php?id= tl_ID.
//På denne måten kan alt innhold i de forskjellige tidslinjene skrives ut på edit.php siden.
function getTimeline() {

		
	
	$sql = "SELECT * FROM timeline_table ORDER BY tl_date DESC";

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
	
	$sql = "SELECT * FROM content_table WHERE tl_ID = $get ORDER BY content_date DESC";
	
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
		}
		else {
			echo "<div class='nu-timeline-cms-article article". $row['content_ID']."' onclick='hentArtikkelInnhold(".$row['tl_ID'].",".$row['content_ID'].")'>";
			echo "<div class='nu-timeline-cms-articleTitle'>".$row['content_title']."</div>"."<div class='nu-timeline-cms-contentLiveStatus nu-timeline-cms-textActive'>Published</div>"."<div class='nu-timeline-cms-articleDate'>".$row['content_date']."</div>"."<div class='nu-timeline-cms-articleContent'>".$trimContent."</div>";
		}
		
		echo "</div>";
		

	}
	
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
function fillEditInputs() {

	$getTLID = $_GET['id'];
	$getContentID = $_GET['article'];
	
	if($getContentID >= 1) {
	
		$sql = "SELECT content_table.*, pic_table.* FROM content_table, pic_table WHERE (content_table.content_ID = $getContentID AND pic_table.content_ID = $getContentID)";
		
		$result = mysql_query($sql);
		
		$print = mysql_fetch_array($result);
		
	
		$content_ID = $print['content_ID'];
		$tl_ID = $print['tl_ID'];
		$content_time = $print['content_time'];
		$content_date = $print['content_date'];
		$content_title = $print['content_title'];
		$content_content = $print['content_content'];
		$pic_path = $print['pic_path'];
		
		echo "<form method='post' id='nu-timeline-cms-editForm' action='updateContent.php?id=$getTLID&article=$getContentID'>
			<label>Overskrift:</label><input id='nu-timeline-cms-TESTcontentTitle' type='text' name='overskrift' class='nu-timeline-cms-fields' value='$content_title' /></br>
			<label>Dato:</label><input type='text' name='dato'  id='nu-timeline-cms-TESTcontentDate' class='nu-timeline-cms-fields datepicker' value='$content_date' /></br>
			<label>Tid:</label><input type='text' name='tid' id='tid' class='nu-timeline-cms-fields' value='$content_time' /></br>
			<label>Tekst:</label></br><div id='nu-timeline-cms-editor'><textarea id='text' cols='10' rows='10' name='articleText'>$content_content</textarea></div></br>
			<label>Bilde url: </label><input type='text' name='purl' id='purl' class='nu-timeline-cms-fields' value='$pic_path' /></br>
			<input type='hidden' id='TESTtlID' value='$getTLID' />			
			<input type='hidden' id='TESTcontentID' value='$getContentID' />
			
			
			<div class='nu-timeline-cms-status-buttons-wrapper'>
		<ul>
			<li>
				<a id='ddStatus' class='btn'>Change status<span class='arrow'></span></a>

				<ul>
					<li><input type='submit' class='btn btn-success' value='Publish' name='savePublish' ></li>
					<li><input type='submit' class='btn btn-primary' value='Draft' name='saveDraft' ></li>
					<li><input type='button' class='btn btn-danger' value='Delete' name='delete' ></li>
				</ul>
			</li>
		</ul>
	</div>";

			
		//må posisjoneres!!!!!!
		echo liveStatus();
			
		
		echo "</form>";
	}
		
}

function fillTlInfoInputs() {
	$getTLID = $_GET['id'];
	
	if($getTLID >= 1) {
	
		$sql = "SELECT * FROM timeline_table WHERE tl_ID = $getTLID";
		
		$result = mysql_query($sql);
		
		$print = mysql_fetch_array($result);
		
	
		$tl_ID = $print['tl_ID'];
		$tl_name = $print['tl_name'];
		$tl_date = $print['tl_date'];
		$tl_desc = $print['tl_desc'];
		
		echo "<form method='post' name='nu-timeline-cms-tlInfoForm' id='nu-timeline-cms-tlInfoForm' action='updateTimeline.php'>
						<label>Tittel:</label> <input type='text' name='nu-timeline-cms-tlTitle' class='nu-timeline-cms-tlInfoFormFields' id='nu-timeline-cms-tlInfoFormTitle' value='$tl_name' /> </br>
						<label>Dato:</label> <input type='text' name='nu-timeline-cms-tlDate' class='nu-timeline-cms-tlInfoFormFields' id='nu-timeline-cms-tlInfoFormDate' value='$tl_date' /> </br>
						<span class='nu-timeline-cms-tlTextArea'><label>Ingress:</label> <textarea cols='67' rows='10' name='nu-timeline-cms-tlIngress' id='nu-timeline-cms-tlInfoFormText'>$tl_desc</textarea></span></br>
						<input type='submit' name='nu-timeline-cms-tlInfoFormSubmit' class='nu-timeline-cms-tlInfoFormSubmit' value='Lagre' />
						<input type='hidden' value='$getTLID' name='hidden' id='nu-timeline-cms-tlInfoFormHiddenID' /> 
			</form>";

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

//funksjon som henter tl_ID fra url
function getTLID() {
	
	$get = $_GET['id'];
	
	echo $get;
}
//funksjon som henter content_ID fra url
function getContentID() {
	$get = $_GET['article'];
	
	echo $get;
}


?>

















