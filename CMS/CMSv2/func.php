<?php
include('connect.inc.php');

function getTimeline() {
			
	$sql = "SELECT * FROM timeline_table";

	$result = mysql_query($sql);
	
	$inc = 1;

	while($row = mysql_fetch_array($result)) {
		echo "<tr class='timelineLine' id='".$row['tl_ID']."' onclick='hentTidslinje(".$row['tl_ID'].")'>";
		echo "<td class='first'>".$row['tl_ID']."</td>"."<td class='second'>".$row['tl_name']."</td>"."<td class='third'>".$row['tl_date']."</td>"."<td class='last'></td>";
		echo "</tr>";
	}
}

function getTimelineName(){
	
	$get = $_GET['id'];
	
	$sql = "SELECT tl_name FROM timeline_table WHERE tl_ID = $get";
	
	$result = mysql_query($sql);
	
	while($row = mysql_fetch_array($result)) {
		echo $row['tl_name'];
	}
	
}

?>