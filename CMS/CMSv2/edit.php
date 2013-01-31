<!DOCTYPE html>
<html>

<head>
	<title>Rediger tidslinje</title>
	<link rel="stylesheet" type="text/css" href="style.css" />
	<?php
		include('func.php');
	?>
</head>

<body>
	<div id="mainWrapper">
		<div id="headerWrapper">
			<div id="logo">
				<div id="bilde">
				<img src="img/Alogo.jpg" height="50px" width="50px" /> 
				</div>
				<div id="text">
				<h1>Tidslinjer > <?php getTimelineName(); ?></h1>
				</div>
			</div>
			<div id="loggUt"><a href="#">LOGG UT</a></div>
			<div id="home"></div>
		</div>
		<div id="main">
			<div id="tlInfo">Tidslinjeinformasjon</div>
			<div id="hendelser">
				<div id="hendelserTop">Hendelser</div>
				<div id="vNav"></div>
				<div id="hNav"></div>
			</div>
		</div>
	</div>

</body>

</html>					