<?php

   // if no valid session is found then the user is not logged in and will
   // receive a access denied message and will be redirected to the login page.
   session_start();
   if (!isset($_SESSION['user_name'])) {
	
	  header("Refresh: 3; url=login/index.php");
	  echo '<h3>Du har ikke tilgang til denne siden.</h3>';
	  echo '<p>Du vil bli sendt til innlogging om 3 sekunder.</p>';
	  exit(); // Quit the script.
   }  
?>
<?php
header ('content-type:text/html;charset=utf-8');
?>
<!DOCTYPE html>

<html>

<head>
	<title>Tidslinje CMS</title>
	<link rel="stylesheet" type="text/css" href="style.css" />
	<link rel="stylesheet" type="text/css" href="bootstrap/css/bootstrap.css" />
	<script src="jquery-1.9.0.js" type="text/javascript"></script>
	<script src="javaScript.js" type="text/javascript"></script>
	<script src="bootstrap/js/bootstrap.js" type="text/javascript"></script>
	<script>
		function hentTidslinje(id) {
			window.location = "edit.php?id="+id;
		}
	</script>
<?php
	include('func.php');
?>

</head>

<body>
	<div id="nu-timeline-cms-mainWrapper">
		<div id="nu-timeline-cms-headerWrapper">
		<div id="nu-timeline-cms-userLoggedIn">
			Logget inn som: <?php  echo $_SESSION['user_name'] ?>	
		</div>
		<table>
		<tr>
			<td id='nu-timeline-cms-headerTableFirst'>
				<div id="nu-timeline-cms-logo">
					<div id="nu-timeline-cms-bilde">
					<img src="img/Alogo.jpg" height="50px" width="50px" /> 
					</div>
					<div id="nu-timeline-cms-text">
					<h1>Tidslinjer</h1>
					</div>
				
				</div>
			</td>
			<td id='nu-timeline-cms-headerTableSecond'>
			</td>
			<td id='nu-timeline-cms-headerTableThird'>
				
			</td>
			<td id='nu-timeline-cms-headerTableFourth'>
				
				<div class="nu-timeline-cms-loggUt" data-toggle='tooltip' data-placement='bottom' title='Logg ut' onclick="window.location.href='login/index.php?logout'"></div>
			</td>
		</tr>
		</table>
		<table>	
			<tr>
				<td>
					<div id ="nu-timeline-cms-newTimeline">
						<a href="insertTimeline.php">Legg til ny tidslinje
							<span class="nu-timeline-cms-addTimelineBtn"></span>
						</a>
					</div>
					
				</td>	
			
				<td>
					<div id="nu-timeline-cms-search">
						<form action="index.php" method="get">
							<input type="text" size="27" name="sok" id="nu-timeline-cms-searchField" placeholder="s&oslash;k etter tidslinje..."/> 
							<input id="nu-timeline-cms-searchButton" type="submit" value="S&Oslash;K" /> 
							
							<?php
							
							$get = $_GET['sok'];
							
							if(!empty($get)){
								echo "Gjeldende s&oslash;k: $get";
							} 
							
							?>
						</form>
						
					</div>
				</td>
			</tr>

		</table>
		</div>
		<div id="nu-timeline-cms-result">
			<table id="nu-timeline-cms-indexTable">
				<tr>
					<th>ID</th>
					<th>Tidslinjenavn</th>
					<th>Sist endret</th>
				</tr>
				
				
				
				<?php
				
				/* SHOW RESULTS FROM SEARCH. SEARCHES FOR TL_ID AND TL_NAME IN TIMELINE_TABLE AND PRINTS RESULTS TO index.php */
				
					function getSearchResults() {
					
					
					$query = $_GET['sok']; 
				    // gets value sent over search form
				     
				    $min_length = 1;
				    // sets minimum length of the search query
				    if(empty($query)){
					    getTimeline();
				    }
				    
				    
				    if(strlen($query) >= $min_length){ // if query length is more than or equal to minimum length then
				         
				        $query = htmlspecialchars($query); 
				        // changes characters used in html to their equivalents, for example: < to &gt;
				         
				        $query = mysql_real_escape_string($query);
				        // makes sure nobody uses SQL injection
				         
				        $raw_results = mysql_query("SELECT * FROM timeline_table WHERE (`tl_ID` LIKE '%".$query."%') OR (`tl_name` LIKE '%".$query."%')") or die(mysql_error());
				             
				        // * means that it selects all fields, you can also write: `id`, `title`, `text`
				        // articles is the name of our table
				         
				        // '%$query%' is what we're looking for, % means anything, for example if $query is Hello
				        // it will match "hello", "Hello man", "gogohello", if you want exact match use `title`='$query'
				        // or if you want to match just full word so "gogohello" is out use '% $query %' ...OR ... '$query %' ... OR ... '% $query'
				        
				        if(mysql_num_rows($raw_results) > 0){ // if one or more rows are returned do following
				           
				            while($results = mysql_fetch_array($raw_results)){
				            // $results = mysql_fetch_array($raw_results) puts data from database into array, while it's valid it does the loop
				                
				                echo "<tr class='timelineLine' id='".$results['tl_ID']."' onclick='hentTidslinje(".$results['tl_ID'].")'>";
				                echo "<td class='first'>".$results['tl_ID']."</td>"."<td class='second'>".$results['tl_name']."</td>"."<td class='third'>".$results['tl_date']."</td>"."<td class='last'></td>";
				                echo "</tr>";
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
				
			</table>
			
		</div>		

	</div>
		

</body>

</html>