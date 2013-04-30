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
			echo "<div style='border-left: 5px solid blue' class='nu-timeline-cms-article article". $row['content_ID']."' onclick='hentArtikkelInnhold(".$row['tl_ID'].",".$row['content_ID'].")'>";
			echo "<div class='nu-timeline-cms-articleTitle'>".$trimTitle."</div>"."<div class='nu-timeline-cms-articleDate'>".$row['content_date']."</div>"."<div class='nu-timeline-cms-articleContent'>".$trimContent."</div>";
			echo "</div>";
		}
		else {
			echo "<div style='border-left: 5px solid green' class='nu-timeline-cms-article article". $row['content_ID']."' onclick='hentArtikkelInnhold(".$row['tl_ID'].",".$row['content_ID'].")'>";
			echo "<div class='nu-timeline-cms-articleTitle'>".$trimTitle."</div>"."<div class='nu-timeline-cms-articleDate'>".$row['content_date']."</div>"."<div class='nu-timeline-cms-articleContent'>".$trimContent."</div>";
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
				<td><input id='nu-timeline-cms-editFormContentTitle' type='text' name='overskrift' value='".$print['content_title']."'' required></input></td>
			</tr>
			</table>
			
			<table class='nu-timeline-cms-editFormDateTable'>
			<tr>
				<td><label class='nu-timeline-cms-editFormLeftLabel'>Dato:</label></td>
				<td></td>
				<td><label class='nu-timeline-cms-editFormTimeLabel'>Tid:</label></td>
				<td></td>
				<td><label class='nu-timeline-cms-editFormCustomLabel'>Egendefinert dato tekst:</label></td>
				<td></td>
			</tr>
			<tr>
				<td><input type='text' name='dato'  id='nu-timeline-cms-editFormContentDate' class='nu-timeline-cms-fields datepicker' value='".$print['content_date']."' required pattern='^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$'></input></td>
				<td><div id='nu-timeline-cms-dateCoin' data-toggle='tooltip' data-placement='top' title='Velg dato for hendelsen. Dette gir hendelsen riktig plassering på tidslinjen.'></div></td>
				<td><input type='text' name='tid' id='nu-timeline-cms-editFormContentTime' placeholder='HH:MM:SS' value='".$print['content_time']."' required pattern='^(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)?([0-5]?\d)$'></input></td>
				<td><div id='nu-timeline-cms-timeCoin' data-toggle='tooltip' data-placement='top' title='Velg tidspunkt for hendelsen. Format: HH:MM:SS'></div></td>
				<td><input type='text' name='custom' id='nu-timeline-cms-editFormCustomTimeDate' value='".$print['content_custom']."'></input></td>
				<td><div id='nu-timeline-cms-customCoin' data-toggle='tooltip' data-placement='top' title='Fylles ut hvis dato ikke er eksakt. Dato må fortsatt settes for å få riktig posisjon på tidslinjen.'></div></td>
			</tr>
			</table>
			
			<table class='nu-timeline-cms-editFormCategoryTable'>
			<tr>
				<td><label class='nu-timeline-cms-editFormLeftLabel'>Kategori:</label></td>
				<td></td>
				<td><label class='nu-timeline-cms-editFormRightLabel'>Viktig hendelse?</label></td>
				<td></td>
			</tr>
			<tr>
				<td>
					<select id='nu-timeline-cms-editFormChooseCategory'>
						"; editFormFillCategories(); echo "
					</select>
				</td>
				<td><div id='nu-timeline-cms-categoryCoin' data-toggle='tooltip' data-placement='top' title='Velg kategori for hendelsen. En hendelse MÅ ikke ha en kategori.'></div></td>
				<td>
					<select id='nu-timeline-cms-editFormImportantArticle'>
						"; editFormFillImportant(); echo "
					</select>
				</td>
				<td><div id='nu-timeline-cms-importantCoin' data-toggle='tooltip' data-placement='top' title='Er hendelsen viktig, vil den utheves på tidslinjen.'></div></td>
				<td>";  
				if($print['content_status'] == 0){
					echo "<div class='nu-timeline-cms-textInactive'>KLADD</div>";		
				}else{
					echo "<div class='nu-timeline-cms-textActive'>PUBLISERT</div>";
				}
				echo "</td>
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
			
			
			</table>		
		
			<div id='nu-timeline-cms-contentMediaPicture'>
				<label id='nu-timeline-cms-lblContentMediaPicture'>Legg til bilder:</label>	
				<a id='nu-timeline-cms-contentMediaPictureOpenClose'><span class='nu-timeline-cms-contentMediaPictureOpenCloseArrow'></span></a>
			</div>
			<div id='nu-timeline-cms-slideContentPicture'>
				<table>
					<tr>
						<td>
							<label>Bildets escenic ID: </label>
						</td>
						<td>	
							<input type='text' id='nu-timeline-cms-escenicID'></input>
							<input type='hidden' id='nu-timeline-cms-hiddenEscenicLink'></input>
						</td>
						<td>
							<select id='nu-timeline-cms-cropVersion'>
								<option disabled selected>Velg størrelse</option>
								<option>w80c169</option>
								<option>w80c23</option>
								<option>w80c34</option>
								<option>w80c43</option>
								<option>w80cFree</option>
								<option>w180c169</option>
								<option>w180c23</option>
								<option>w180c34</option>
								<option>w180c43</option>
								<option>w180cFree</option>
								<option>w280c169</option>
								<option>w280c23</option>
								<option>w280c34</option>
								<option>w280c43</option>
								<option>w280cFree</option>
								<option>w380c169</option>
								<option>w380c23</option>
								<option>w380c34</option>
								<option>w380c43</option>
								<option>w380cFree</option>
								<option>w480c169</option>
								<option>w480c23</option>
								<option>w480c34</option>
								<option>w480c43</option>
								<option>w480cFree</option>
								<option>w580c169</option>
								<option>w580c23</option>
								<option>w580c34</option>
								<option>w580c43</option>
								<option>w580cFree</option>
								<option>w680c169</option>
								<option>w680c23</option>
								<option>w680c34</option>
								<option>w680c43</option>
								<option>w680cFree</option>
								<option>w780c169</option>
								<option>w780c43</option>
								<option>w780cFree</option>
								<option>w880c169</option>
								<option>w880c43</option>
								<option>w880cFree</option>
								<option>w980c169</option>
								<option>w980c43</option>
								<option>w980cFree</option>
							</select>
						</td>
					</tr>
				</table>
				
				<div id='nu-timeline-cms-picturePreview'>
					<label>Preview</label>
				</div>
						
				
			</div>
				
			<div id='nu-timeline-cms-contentMediaVideo'>
				<label id='nu-timeline-cms-lblContentMediaVideo'>Legg til video:</label>
				<a id='nu-timeline-cms-contentMediaVideoOpenClose'><span class='nu-timeline-cms-contentMediaVideoOpenCloseArrow'></span></a>	
			</div>
			<div id='nu-timeline-cms-slideContentVideo'>
				
			</div>
			
			<div id='nu-timeline-cms-contentMediaMap'>
				<label id='nu-timeline-cms-lblContentMediaMap'>Legg til kart:</label>
				<a id='nu-timeline-cms-contentMediaMapOpenClose'><span class='nu-timeline-cms-contentMediaMapOpenCloseArrow'></span></a>
			</div>
			<div id='nu-timeline-cms-slideContentMap'>
				<div id='nu-timeline-cms-mapsSearchPanel' style='margin-left: 0px'>
					<input id='nu-timeline-cms-mapSearchTextField' type='text' size='50'>
					
	
				</div>
				<div id='nu-timeline-cms-googleMapAPI'></div>
				<button id='nu-timeline-cms-saveMapButton'>Save</button>
				
			</div>
			
			
			
			<input type='hidden' id='editFormHiddenTlID' value='".$_REQUEST['id']."' />			
			<input type='hidden' id='editFormHiddenContentID' value='".$_REQUEST['article']."' />
			

			<div class='nu-timeline-cms-status-buttons-wrapper'>
				<ul>
					<li>
						<a id='ddStatus' class='btn'>Endre status<span class='arrow'></span></a>
						<ul>
							<li><input type='submit' class='btn btn-success' value='Publiser' name='savePublish' ></li>
							<li><input type='submit' class='btn btn-primary' value='Kladd' name='saveDraft' ></li>
							<li><input type='button' class='btn btn-danger' value='Slett' name='delete' ></li>
						</ul>
					</li>
				</ul>
			</div>

			</form>
			";

			
			
		
		
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
				<td></td>
			</tr>
			<tr>
				<td><input type='text' name='nu-timeline-cms-tlTitle' class='nu-timeline-cms-tlInfoFormTitle' id='nu-timeline-cms-tlInfoFormTitle' value='".$print['tl_name']."'  required/></td>
				<td><input type='text' id='nu-timeline-cms-tlInfoFormCategoryInput' name='nu-timeline-cms-categoryName'  required/></td>
				<td><div id='nu-timeline-cms-tlCategoryCoin' data-toggle='tooltip' data-placement='top' title='En tidslinje kan ha opp til 6 kategorier. Kategorisering av hendelser gjør det mulig for leser å spesifisere hva som vises på tidslinjen.'></div></td>
				<td><span id='nu-timeline-cms-addCategoryBtn' class='nu-timeline-cms-plusBtn' name='nu-timeline-cms-addCategoryBtn'></span></td>
			</tr>
			<tr>
				<td><label class='nu-timeline-cms-tlInfoFormLabels'>Ingress:</label></td>
				<td></td>
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
}

function editFormFillImportant(){
	$result = mysql_query("SELECT * FROM content_table WHERE content_ID = '".$_REQUEST['article']."'");
	$print = mysql_fetch_array($result);
	
	echo "<option disabled selected>Velg..</option>";
	
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