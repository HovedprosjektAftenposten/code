<?php
header ('content-type:text/html;charset=utf-8');
?>
<!DOCTYPE html>
<html>

<head>
	<title>Rediger tidslinje</title>
	<link rel="stylesheet" type="text/css" href="style.css" />
	<link rel="stylesheet" type="text/css" href="bootstrap/css/bootstrap.css" />
	<link rel="stylesheet" type="text/css" href="jquery-ui.css" />	
	<link rel="stylesheet" href="spectrum/spectrum.css" />
	<script src="jquery-1.9.0.js" type="text/javascript"></script>
	<script src="javaScript.js" type="text/javascript"></script>
	<script src="bootstrap/js/bootstrap.js" type="text/javascript"></script>
	<script src="jquery-ui-1.10.0.custom.js" type="text/javascript"></script>
	<script src="ckeditor/ckeditor.js"></script>
	<script src="spectrum/spectrum.js"></script>					
	<script src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&libraries=places"></script>
	
	<script>

	// FUNCTION THAT GETS tl_ID AND content_ID FROM getArticle() IN func.php. ADDS THE VALUES TO THE URL. 

		function hentArtikkelInnhold(id,article) {
			window.location = "?id="+id+"&article="+article;
		}
	   
	</script>
	
	
	
	
<!-- 	DROPDOWN BUTTON IN edit.php -->
	
	<?php
		include('func.php');
	?>
	<?php
		
		checkTlName();
	
	?>


</head>

<body>
	<div id="nu-timeline-cms-mainWrapper">
		<div id="nu-timeline-cms-headerWrapper">
		<table>
			<tr>
				<td id='nu-timeline-cms-headerTableFirst'>
					<div id="nu-timeline-cms-logo">
						<div id="nu-timeline-cms-bilde">
						<a href="index.php"><img src="img/Alogo.jpg" height="50px" width="50px"></a> 
						</div>
						<div id="nu-timeline-cms-text">
							<h1 id="nu-timeline-cms-menuText"><a href="index.php">Tidslinjer</a> > <?php getTimelineName(); ?></h1>
						</div>
					</div>
				</td>
				<td id='nu-timeline-cms-headerTableSecond'>
					
				</td>
				<td id='nu-timeline-cms-headerTableThird'>
					<div id="nu-timeline-cms-home" onclick="window.location.href='index.php'"></div>
				</td>
				<td id='nu-timeline-cms-headerTableFourth'>	
					<div id="nu-timeline-cms-loggUt"><a href="#">LOGG UT</a></div>
				</td>
			</tr>
		</table>
		</div>
		
		<div id="nu-timeline-cms-main">
			<div id="nu-timeline-cms-tlInfoWrapper">
				<div id="nu-timeline-cms-tlInfo">
					<p>Fyll inn informasjon om tidslinjen</p>
					<a id="nu-timeline-cms-tlOpenClose"><span class="nu-timeline-cms-tlOpenCloseArrow"></span></a>
				</div>
				<div class="nu-timeline-cms-slide">
					<?php fillTlInfoInputs(); ?>
				</div>
			</div>
			<div id="nu-timeline-cms-hendelser">
				<div id="nu-timeline-cms-hendelserTop">
					<p>Legg til hendelse</p>
					
					
						<a href="insertContent.php?id=<?php getTLID(); ?>">
							<span class="nu-timeline-cms-plusBtn content">
							</span>
						</a>
					
		<!-- SEARCHFORM -->					
					
				</div>
			</div>
			<div id="nu-timeline-cms-navWrapper">
			
				<div id="nu-timeline-cms-vNav">
					<div id='nu-timeline-cms-searchContent'>
						<form id='nu-timeline-cms-articleSearchForm' method='post' action='edit.php?id=<?php getTLID(); ?>'>
						<input id='nu-timeline-cms-contentSearchField' type='text' name='sok' placeholder='S&oslash;k i hendelser...'>
						<input id='nu-timeline-cms-searchButton' type='submit' value='S&Oslash;K'>
					</form>
					</div>
					<div id="nu-timeline-cms-articles">
					<?php
				
				/* SHOW RESULTS FROM SEARCH. SEARCHES FOR TL_ID AND TL_NAME IN TIMELINE_TABLE AND PRINTS RESULTS TO index.php */
				
						function getSearchResults() {
						
						
						$query = $_POST['sok'];
						$get = $_GET['id'];
					    // gets value sent over search form
					     
					    $min_length = 1;
					    // sets minimum length of the search query
				
				
					    if(empty($query)){
						    getArticle();
					    }
					    
					    if(strlen($query) >= $min_length){ // if query length is more than or equal to minimum length then
					         
					        $query = htmlspecialchars($query); 
					        // changes characters used in html to their equivalents, for example: < to &gt;
					         
					        $query = mysql_real_escape_string($query);
					        // makes sure nobody uses SQL injection
					         
					        $raw_results = mysql_query("
					        SELECT * FROM content_table WHERE (content_ID LIKE '%".$query."%' OR content_title LIKE '%".$query."%' OR content_content LIKE '%".$query."%') AND tl_ID = $get") or die(mysql_error());
					             
					        // * means that it selects all fields, you can also write: `id`, `title`, `text`
					        // articles is the name of our table
					         
					        // '%$query%' is what we're looking for, % means anything, for example if $query is Hello
					        // it will match "hello", "Hello man", "gogohello", if you want exact match use `title`='$query'
					        // or if you want to match just full word so "gogohello" is out use '% $query %' ...OR ... '$query %' ... OR ... '% $query'
					        
					        if(mysql_num_rows($raw_results) > 0){ // if one or more rows are returned do following
					           	echo "<div class='nu-timeline-cms-searchWord'>Gjeldende s&oslash;k: $query</div>";
			
					            while($results = mysql_fetch_array($raw_results)){
					            // $results = mysql_fetch_array($raw_results) puts data from database into array, while it's valid it does the loop
					                
					                if(strlen($results['content_content']) > 30){
						                $trimContent = substr($results['content_content'], 0, 30).'...';
							
									}else{
										$trimContent = $results['content_content'];
										
									}
									if(strlen($results['content_title']) > 30){
										$trimTitle = substr($results['content_title'], 0, 30).'...';
									}else{
										$trimTitle = $results['content_title'];
									}
			
					                if($results['content_status'] == 0) {
					                	
										echo "<div class='nu-timeline-cms-article article". $results['content_ID']."' onclick='hentArtikkelInnhold(".$results['tl_ID'].",".$results['content_ID'].")'>";
										echo "<div class='nu-timeline-cms-articleTitle'>".$trimTitle."</div>"."<div class='nu-timeline-cms-contentLiveStatus nu-timeline-cms-textInactive'>Draft</div>"."<div class='nu-timeline-cms-articleDate'>".$results['content_date']."</div>"."<div class='nu-timeline-cms-articleContent'>".$trimContent."</div>";
										echo "</div>";
										
									}
									else {
										echo "<div class='nu-timeline-cms-article article". $results['content_ID']."' onclick='hentArtikkelInnhold(".$results['tl_ID'].",".$results['content_ID'].")'>";
										echo "<div class='nu-timeline-cms-articleTitle'>".$trimTitle."</div>"."<div class='nu-timeline-cms-contentLiveStatus nu-timeline-cms-textActive'>Published</div>"."<div class='nu-timeline-cms-articleDate'>".$results['content_date']."</div>"."<div class='nu-timeline-cms-articleContent'>".$trimContent."</div>";
										echo "</div>";
									}
			
										
					                // posts results gotten from database
					            }
					             
					        }
					        
					        else{ // if there is no matching rows do following
					            
					            echo "Ingen treff";
					            
					            
					        }
					     
					         
					    } 	
					    
					    }
					    getSearchResults();				    
				    
				
	?>
					</div>
				</div>
				<div id="nu-timeline-cms-hNav">
					
					<div id="inputFields" class="form">
						<?php
							fillEditInputs();
						?>
					</div>
					
					
					
				</div>
			</div>
			</div>
		</div>

	
	<div id='nu-timeline-cms-statusMessage' style='background-color: white; border: 1px solid #e4e4e4; padding: 5px; position: fixed; bottom: 0px; right: 5px;'></div>
	
</body>

</html>					