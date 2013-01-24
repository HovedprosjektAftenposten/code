<html>
<?php 
	include('connect.inc.php'); //inkluderer den faste connection-stringen i dette dokumentet. Åpen til den blir lukket med mysql_close()
 	include('pic_table.inc.php');
 	include('content_table.inc.php');
 ?>
 <br>
<head>
	<title>Index</title>

	<p><?php print $contentContent ?></p> 
	<img src="<?php print $picPath ?>" alt="" />
	
</head>



<body>

<img src="" alt="" />

</body>

</html>