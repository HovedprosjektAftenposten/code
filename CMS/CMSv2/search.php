<?php

	
	ob_start();

	include('connect.inc.php');
	
function getSearchResults() {
	
	/* $knapp = $_POST['testBtn']; */
	
	
	$query = $_POST['query']; 
    // gets value sent over search form
     
    $min_length = 1;
    // you can set minimum length of the query if you want
     
    if(strlen($query) >= $min_length){ // if query length is more or equal minimum length then
         
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
             
                /* echo "<p><h3>".$results['tl_ID']."</h3>".$results['tl_name']."</p>"; */
                
                echo "<tr class='timelineLine' id='".$results['tl_ID']."' onclick='hentTidslinje(".$results['tl_ID'].")'>";
                echo "<td class='first'>".$results['tl_ID']."</td>"."<td class='second'>".$results['tl_name']."</td>"."<td class='third'>".$results['tl_date']."</td>"."<td class='last'></td>";
                echo "</tr>";
                // posts results gotten from database(title and text) you can also show id ($results['id'])
            }
            
            /*
while($results = mysql_fetch_array($raw_result)) {
		echo "<tr class='timelineLine' id='".$row['tl_ID']."' onclick='hentTidslinje(".$row['tl_ID'].")'>";
		echo "<td class='first'>".$row['tl_ID']."</td>"."<td class='second'>".$row['tl_name']."</td>"."<td class='third'>".$row['tl_date']."</td>"."<td class='last'></td>";
		echo "</tr>";
	}
*/
	
	
             
        }
        else{ // if there is no matching rows do following
            
            echo "Ingen treff";
        }
         
    }
    else{ // if query length is less than minimum
        /* echo "Minimum length is ".$min_length; */
    }
    
}
	    
    
?>