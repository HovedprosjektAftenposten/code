<?php
include('connect.inc');

//function som skriver ut alle tidslinjer på index.php. Hver tidslinje får en onclick som er satt til tl_ID. Onclick kaller på js script i index.php, som igjen setter urlen til edit.php?id= tl_ID.
//På denne måten kan alt innhold i de forskjellige tidslinjene skrives ut på edit.php siden.
function getTimeline() {

	/* $sql = "SELECT * FROM timeline_table ORDER BY tl_date DESC"; */

	$result = mysql_query("SELECT * FROM timeline_table ORDER BY tl_lastEdit DESC");
	
	while($row = mysql_fetch_array($result)) {
		echo "<tr class='timelineLine' id='".$row['tl_ID']."' onclick='hentTidslinje(".$row['tl_ID'].")'>";
		echo "<td class='first'>".$row['tl_ID']."</td>"."<td class='second'>".$row['tl_name']."</td>"."<td class='third'>".$row['tl_lastEdit']."</td>"."<td class='last'></td>";
		echo "</tr>";
	}
	
	
}
//funskjon som finner riktig navn på tidslinje. Brukes i "meny teksten" øverst på edit.php. Bruker $_GET['id'] fra url.
function getTimelineName(){
	
	/* $sql = "SELECT tl_name FROM timeline_table WHERE tl_ID = '".$_REQUEST['id']."'"; */
	
	$result = mysql_query("SELECT tl_name FROM timeline_table WHERE tl_ID = '".$_REQUEST['id']."'");
	if(!empty($result)){
		while($row = mysql_fetch_array($result)) {
			if(strlen($row['tl_name']) < 23){
				echo $row['tl_name'];
			}else{
				$trimContent = substr($row['tl_name'], 0, 23).' ...';
				echo $trimContent;
			}
		}
	}
}

//funksjon som henter ut alt fra content_table hvor tl_ID = id i url. Lager div'er med innholdet fra content_table. Hver div får en onclick som kaller på et js script i edit.php.
//onclicken sender med seg tl_ID og content_ID som brukes i urlen til å håndtere $_GET.
function getArticle() {
	
	/* $sql = "SELECT * FROM content_table WHERE tl_ID = '".$_REQUEST['id']."' ORDER BY content_date DESC"; */
	
	$result = mysql_query("SELECT * FROM content_table WHERE tl_ID = '".$_REQUEST['id']."' ORDER BY content_date DESC");
	
	while($row = mysql_fetch_array($result)) {
	
			if(strlen($row['content_content']) > 30){
				$trimContent = substr($row['content_content'], 0, 30).'...';
				
			}else{
				$trimContent = $row['content_content'];
				
			}
			if(strlen($row['content_title']) > 30){
				$trimTitle = substr($row['content_title'], 0, 30).'...';
			}else{
				$trimTitle = $row['content_title'];
			}
		
		if($row['content_status'] == 0) {
			echo "<div class='nu-timeline-cms-article article". $row['content_ID']."' onclick='hentArtikkelInnhold(".$row['tl_ID'].",".$row['content_ID'].")'>";
			echo "<div class='nu-timeline-cms-articleTitle'>".$trimTitle."</div>"."<div class='nu-timeline-cms-contentLiveStatus nu-timeline-cms-textInactive'>Draft</div>"."<div class='nu-timeline-cms-articleDate'>".$row['content_date']."</div>"."<div class='nu-timeline-cms-articleContent'>".$trimContent."</div>";
			echo "</div>";
		}
		else {
			echo "<div class='nu-timeline-cms-article article". $row['content_ID']."' onclick='hentArtikkelInnhold(".$row['tl_ID'].",".$row['content_ID'].")'>";
			echo "<div class='nu-timeline-cms-articleTitle'>".$trimTitle."</div>"."<div class='nu-timeline-cms-contentLiveStatus nu-timeline-cms-textActive'>Published</div>"."<div class='nu-timeline-cms-articleDate'>".$row['content_date']."</div>"."<div class='nu-timeline-cms-articleContent'>".$trimContent."</div>";
			echo "</div>";
		}

	}
	
}

//function som henter verdien av article fra url'en, og bruker denne til å fylle input-felter.
function fillEditInputs() {

	if($_REQUEST['article'] >= 1) {
	
/* 		$sql = "SELECT content_table.*, media_table.* FROM content_table, media_table WHERE (content_table.content_ID = '".$_REQUEST['article']."' AND media_table.content_ID = '".$_REQUEST['article']."')"; */
		
		$result = mysql_query("SELECT content_table.*, media_table.* FROM content_table, media_table WHERE (content_table.content_ID = '".$_REQUEST['article']."' AND media_table.content_ID = '".$_REQUEST['article']."')");
		
		$result2 = mysql_query("SELECT * FROM timeline_table WHERE tl_ID = '".$_REQUEST['id']."'");
		
		$print = mysql_fetch_array($result);
		
		$print2 = mysql_fetch_array($result2);
		
		echo "<form method='post' id='nu-timeline-cms-editForm' action='updateContent.php?id=".$_REQUEST['id']."&article=".$_REQUEST['article']."'>
			<table class='nu-timeline-cms-editTable'>
			<table class='nu-timeline-cms-editFormTitleTable'>
			<tr>
				<td><label class='nu-timeline-cms-editFormLeftLabel'>Overskrift:</label></td>
			</tr>
			<tr>
				<td><input id='nu-timeline-cms-editFormContentTitle' type='text' name='overskrift' value='".$print['content_title']."''></input></td>
			</tr>
			</table>
			
			<table class='nu-timeline-cms-editFormDateTable'>
			<tr>
				<td><label class='nu-timeline-cms-editFormLeftLabel'>Dato:</label></td>
				<td><label>Tid:</label></td>
				<td><label>Egendefinert dato tekst:</label></td>
			</tr>
			<tr>
				<td><input type='text' name='dato'  id='nu-timeline-cms-editFormContentDate' class='nu-timeline-cms-fields datepicker' value='".$print['content_date']."'></input></td>
				<td><input type='text' name='tid' id='nu-timeline-cms-editFormContentTime' value='".$print['content_time']."'></input></td>
				<td><input type='text' name='custom' id='nu-timeline-cms-editFormCustomTimeDate' value='".$print['content_custom']."'></input></td>
			</tr>
			</table>
			
			<table class='nu-timeline-cms-editFormCategoryTable'>
			<tr>
				<td><label class='nu-timeline-cms-editFormLeftLabel'>Kategori:</label></td>
				<td><label>Viktig hendelse?</label></td>
			</tr>
			<tr>
				<td>
					<select id='nu-timeline-cms-editFormChooseCategory'>
						"; editFormFillCategories(); echo "
					</select>
				</td>
				<td>
					<select id='nu-timeline-cms-editFormImportantArticle'>
						"; editFormFillImportant(); echo "
					</select>
				</td>
			</tr>
			</table>
			
			<table class='nu-timeline-cms-editFormTextTable'>
			<tr>
				<td><label class='nu-timeline-cms-editFormLeftLabel'>Tekst:</label></td>
			</tr>
			<tr>
				<td><div id='nu-timeline-cms-CKeditor'><textarea id='text' cols='10' rows='10' name='articleText'>".$print['content_content']."</textarea></div></td>
			</tr>
			</table>
			
			<table class='nu-timeline-cms-editFormBottomTable'>
			<tr>
				<td><label class='nu-timeline-cms-editFormLeftLabel'>Bilde url: </label></td>
				<td><label>Status:<label></td>
			</tr>
			<tr>
				<td><input type='text' name='purl' id='nu-timeline-cms-editFormContentPic' class='nu-timeline-cms-fields' value='".$print['media_data']."'></input></td>
				<td class='nu-timeline-cms-editFormStatusBtn'>
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
					</div>
				</td>
			</tr>
			</table>
			</table>
		
			<div id='nu-timeline-cms-contentMediaPicture'>
				Bilde
				
				<div id='nu-timeline-cms-slideContentPicture'>
				Open
				</div>
			</div>
			<div id='nu-timeline-cms-contentMediaVideo'>
				Video
				
				<div id='nu-timeline-cms-slideContentVideo'>
				Open
				</div>
			</div>
			<div id='nu-timeline-cms-contentMediaMap'>
				Kart
				
				<div id='nu-timeline-cms-slideContentMap'>
					<input type='text'></input>
				</div>
			</div>
			
			<input type='hidden' id='editFormHiddenTlID' value='".$_REQUEST['id']."' />			
			<input type='hidden' id='editFormHiddenContentID' value='".$_REQUEST['article']."' />
			
			
			
			
			";

			
			
		
		echo "</form>";
	}
		
}

function fillTlInfoInputs() {
	
	if($_REQUEST['id'] >= 1) {
	
/* 		$sql = "SELECT * FROM timeline_table WHERE tl_ID = '".$_REQUEST['id']."'"; */
		
		$result = mysql_query("SELECT * FROM timeline_table WHERE tl_ID = '".$_REQUEST['id']."'");
		$result2 = mysql_query("SELECT * FROM category_table WHERE tl_ID = '".$_REQUEST['id']."'");
		
		$print = mysql_fetch_array($result);
		$print2 = mysql_fetch_array($result2);
		
		echo "<form method='post' id='nu-timeline-cms-tlInfoForm' name='nu-timeline-cms-tlInfoForm' action='updateTimeline.php'>
			<table>
			<tr>
				<td><label class='nu-timeline-cms-tlInfoFormLabels'>Tittel:</label></td>
				<td><label class='nu-timeline-cms-tlInforFormCategoriesLabel'>Legg til kategori (maks 6):</label></td>
				<td></td>
			</tr>
			<tr>
				<td><input type='text' name='nu-timeline-cms-tlTitle' class='nu-timeline-cms-tlInfoFormTitle' id='nu-timeline-cms-tlInfoFormTitle' value='".$print['tl_name']."' /></td>
				<td><input type='text' id='nu-timeline-cms-tlInfoFormCategoryInput' name='nu-timeline-cms-categoryName' /></td>
				<td><span id='nu-timeline-cms-addCategoryBtn' class='nu-timeline-cms-plusBtn' name='nu-timeline-cms-addCategoryBtn'></span></td>
			</tr>
			<tr>
				<td><label class='nu-timeline-cms-tlInfoFormLabels'>Ingress:</label></td>
				<td><label class='nu-timeline-cms-tlInforFormCategoriesLabel'>Kategorier:</label></td>
				<td></td>
			</tr>
			<tr>
				<td><textarea cols='67' rows='10' name='nu-timeline-cms-tlIngress' id='nu-timeline-cms-tlInfoFormText'>".$print['tl_ingress']."</textarea></td>
				<td><div id='nu-timeline-cms-showCategories'></div></td>
				<td></td>
				 
			</tr>
			</table>
			<input type='hidden' value='".$_REQUEST['id']."' name='hidden' id='nu-timeline-cms-tlInfoFormHiddenID' />
			<input type='hidden' value='".$print2['category6']."' id='editFormHiddenCategory' />
			</form>";

	}
}

//funskjon som sjekker om hendelsen er publisert eller om det kun er en kladd. Rødt kryss for kladd(draft) og grønn v for published.
function liveStatus() {
	
/* 	$sql = "SELECT * FROM content_table WHERE content_ID = '".$_REQUEST['article']."'"; */
	
	$result = mysql_query("SELECT * FROM content_table WHERE content_ID = '".$_REQUEST['article']."'");
	
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
	
	echo $_REQUEST['id'];
}
//funksjon som henter content_ID fra url
function getContentID() {

	echo $_REQUEST['article'];
}
// function that fills the dropdown menu with the correct categories, and sets one as selected.
function editFormFillCategories(){

	$result = mysql_query("SELECT * FROM content_table WHERE content_ID = '".$_REQUEST['article']."'");
	$result2 = mysql_query("SELECT * FROM category_table WHERE tl_ID = '".$_REQUEST['id']."'");
	$print = mysql_fetch_array($result);
	$print2 = mysql_fetch_array($result2);
	
	
	echo "<option>Velg kategori..</option>";

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
}

function editFormFillImportant(){
	$result = mysql_query("SELECT * FROM content_table WHERE content_ID = '".$_REQUEST['article']."'");
	$print = mysql_fetch_array($result);
	
	echo "<option>Velg..</option>";
	
	if(!empty($print['content_important'])) {
		if($print['content_important'] == "Nei") {
			echo "<option selected='selected'>Nei</option>";
			echo "<option>Ja</option>";
		}
		if($print['content_important'] == "Ja") {
			echo "<option>Nei</option>";
			echo "<option selected='selected'>Ja</option>";
		}
		
	}else if(empty($print['content_important'])){
		echo "<option>Nei</option><option>Ja</option>";
	}
}

function checkTlName() {
			
	$sql = "SELECT * FROM timeline_table WHERE tl_ID = '".$_REQUEST['id']."'";
	
	$result = mysql_query($sql);
	
	
		while($row = mysql_fetch_array($result)) {
			$sjekk = $row['tl_name'];
			
		}
		
		if(strlen($sjekk) < 1){
			echo "<input type='hidden' value='OK' id='nu-timeline-cms-hiddenInput' />";	
		}
		else {
			echo "<input type='hidden' value='NOPE' id='nu-timeline-cms-hiddenInput' />";
		}
		
}
?>