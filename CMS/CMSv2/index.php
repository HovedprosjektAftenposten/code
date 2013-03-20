<!DOCTYPE html>
<html>

<head>
	<title>Tidslinje CMS</title>
	<link rel="stylesheet" type="text/css" href="style.css" />
	<script src="jquery-1.9.0.js" type="text/javascript"></script>
	<script src="pop.js" type="text/javascript"></script>
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
				<div id="nu-timeline-cms-home" onclick="window.location.href='index.php'"></div>
			</td>
			<td id='nu-timeline-cms-headerTableFourth'>
				<div id="nu-timeline-cms-loggUt"><a href="#">LOGG UT</a></div>
			</td>
		</tr>
		</table>	
			<div id="nu-timeline-cms-search">
				<form action="index.php" method="get">
					<input type="text" size="30" name="sok" id="nu-timeline-cms-searchField" placeholder="s&oslash;k etter tidslinje..."/> 
					<input id="nu-timeline-cms-searchButton" type="submit" value="S&Oslash;K" /> 
					<?php
					
					$get = $_GET['sok'];
					
					if(!empty($get)){
						echo "Gjeldende s&oslash;k: $get";
					} 
					
					?>
				</form>
			</div>
		</div>
		<div id="nu-timeline-cms-result">
			<table id="nu-timeline-cms-indexTable">
				<tr>
					<th>id</th>
					<th>tidslinjenavn</th>
					<th>sist endret</th>
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
		
			<a href="insertTimeline.php">
				<span class="nu-timeline-cms-plusBtn">
				</span>
			</a>
		

	</div>
		

</body>

</html>