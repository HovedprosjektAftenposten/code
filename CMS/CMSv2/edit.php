<!DOCTYPE html>
<html>

<head>
	<title>Rediger tidslinje</title>
	<link rel="stylesheet" type="text/css" href="style.css" />
	<link rel="stylesheet" type="text/css" href="bootstrap.css" />
	<link rel="stylesheet" type="text/css" href="jquery-ui.css" />	
	<script src="jquery-1.9.0.js" type="text/javascript"></script>
	<script src="pop.js" type="text/javascript"></script>
	<script src="javaScript.js" type="text/javascript"></script>
	<script src="bootstrap.min.js" type="text/javascript"></script>
	<script src="jquery-ui-1.10.0.custom.js" type="text/javascript"></script>
	<script src="ckeditor/ckeditor.js"></script>

						
	
	<script>

	// FUNCTION THAT GETS tl_ID AND content_ID FROM getArticle() IN func.php. ADDS THE VALUES TO THE URL. 

		function hentArtikkelInnhold(id,article) {
			window.location = "?id="+id+"&article="+article;
		}
		   
	   function fixSelectedBackground() {
		    var url = document.URL;
	    	var urlsplitted = url.split("article");
	    	var supersplitted = urlsplitted[urlsplitted.length -1].split("=");
	    	var superid = supersplitted[supersplitted.length - 1];	    	
	    	$(".article" + superid).css({"background-color":"gray","color":"white"});
	   }
	   
	</script>
<!-- 	DROPDOWN BUTTON IN edit.php -->
	<script type="text/javascript">
		$(document).ready(function(){
			$('#ddStatus').click(function(){

				$('ul li > ul').slideToggle(100);		
				$('.arrow').toggleClass('droppedDown');	
			});

		});

	</script>
		
	<?php
		include('func.php');
	?>
	
	<?php
		function test() {
	
			$get = $_GET['id'];
			
			$sql = "SELECT * FROM timeline_table WHERE tl_ID = $get";
			
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

	echo test();
	
	?>
	
	<div id="resultat"></div>


</head>

<body>

	<div id="nu-timeline-cms-mainWrapper">
		<div id="nu-timeline-cms-headerWrapper">
			<div id="nu-timeline-cms-logo">
				<div id="nu-timeline-cms-bilde">
				<a href="index.php"><img src="img/Alogo.jpg" height="50px" width="50px" /></a> 
				</div>
				<div id="nu-timeline-cms-text">
					<h1 id="nu-timeline-cms-menuText"><a href="index.php">Tidslinjer</a> > <?php getTimelineName(); ?></h1>
				</div>
			</div>
			<div id="nu-timeline-cms-loggUt"><a href="#">LOGG UT</a></div>
			<div id="nu-timeline-cms-home" onclick="window.location.href='index.php'"></div>
		</div>
		<div id="nu-timeline-cms-main">
			<div id="nu-timeline-cms-tlInfoWrapper">
				<div id="nu-timeline-cms-tlInfo">
					<p>Tidslinjeinformasjon</p>
					<a id="nu-timeline-cms-tlOpenClose"><span class="tlOpenCloseArrow"></span></a>
				</div>
				<div id="nu-timeline-cms-slide">
					<?php fillTlInfoInputs(); ?>
				</div>
			</div>
			<div id="nu-timeline-cms-hendelser">
				<div id="nu-timeline-cms-hendelserTop">
					<p>Hendelser</p>
					
					<div id="nu-timeline-cms-newArticleBtn">
						<a href="insertContent.php?id=<?php getTLID(); ?>">
							<span class="nu-timeline-cms-test">
							</span>
						</a>
					</div>
		<!-- SEARCHFORM -->					
					<form id="nu-timeline-cms-articleSearchForm" method="post" action="edit.php?id=<?php getTLID(); ?>">
						<input type="text" name="sok" placeholder="S&oslash;k i hendelser...">
						<input id="nu-timeline-cms-searchButton" type="submit" value="S&Oslash;K">
					</form>
					
					<div id="nu-timeline-cms-fade">
						<div id="nu-timeline-cms-popWindow">
							<form id="nu-timeline-cms-deleteForm" action="deleteContent.php?id=<?php getTLID();?>&article=<?php getContentID();?>" method="post">
									<p>Er du sikker p&aring; at du vil slette innlegget?</p>
									<p>NB! Dette kan ikke angres!</p>
									<input type="submit" name="delete" value="JA" /><input type="submit" name="goBack" value="NEI" />
							</form>		
							<a href="#" id="close">close</a>
						</div>
					</div>
			</div>
				<div id="nu-timeline-cms-vNav">
					
					<?php
				
				/* SHOW RESULTS FROM SEARCH. SEARCHES FOR TL_ID AND TL_NAME IN TIMELINE_TABLE AND PRINTS RESULTS TO index.php */
				
			function getSearchResults() {
			
			
			$query = $_POST['sok'];
			$get = $_GET['id'];
		    // gets value sent over search form
		     
		    $min_length = 1;
		    // sets minimum length of the search query
	
// IN PROGRESS	
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
		                
		                $content = $results['content_content'];
		                $trimContent = substr($content, 0, 30).'...';

		                if($results['content_status'] == 0) {
		                	
							echo "<div class='nu-timeline-cms-article article". $results['content_ID']."' onclick='hentArtikkelInnhold(".$results['tl_ID'].",".$results['content_ID'].")'>";
							echo "<div class='nu-timeline-cms-articleTitle'>".$results['content_title']."</div>"."<div class='nu-timeline-cms-contentLiveStatus nu-timeline-cms-textInactive'>Draft</div>"."<div class='nu-timeline-cms-articleDate'>".$results['content_date']."</div>"."<div class='nu-timeline-cms-articleContent'>".$trimContent."</div>";
							
						}
						else {
							echo "<div class='nu-timeline-cms-article article". $results['content_ID']."' onclick='hentArtikkelInnhold(".$results['tl_ID'].",".$results['content_ID'].")'>";
							echo "<div class='nu-timeline-cms-articleTitle'>".$results['content_title']."</div>"."<div class='nu-timeline-cms-contentLiveStatus nu-timeline-cms-textActive'>Published</div>"."<div class='nu-timeline-cms-articleDate'>".$results['content_date']."</div>"."<div class='nu-timeline-cms-articleContent'>".$trimContent."</div>";
							
						}

							echo "</div>";
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
				<div id="nu-timeline-cms-hNav">
					
					<div id="inputFields" class="form">
						<?php
							fillEditInputs();
						?>
					</div>
					
					<div id="picInput"></div>
					
				</div>
			</div>
		</div>
	</div>
	
</body>

</html>					