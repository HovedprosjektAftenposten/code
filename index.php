<html>
<?php 
	include('connect.php'); //inkluderer den faste connection-stringen i dette dokumentet. Åpen til den blir lukket med mysql_close($connect)
 ?>
<head>
	<title>Index</title>
<?php 
	
	$sql = 'SELECT * FROM timeline_table';
	
	$result = mysql_query($sql); //sender spørrngen og lagrer resultatet i variablen $result
	
	$print = mysql_fetch_array($result); //lager et array av variablen $result
	$ID = $print['tl_ID']; //henter ut spesifike felter
	$name = $print['tl_name'];
	$date = $print['tl_date'];
	$desc = $print['tl_desc'];
	$cID = $print['content_ID'];
	
	echo $ID,' ', $name,' ', $date,' ', $desc,' ', $cID; //skriver de valgte feltene ut på skjermen
 ?>	
	
</head>

<body>

</body>

</html>