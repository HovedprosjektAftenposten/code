<!DOCTYPE html>
<html>

<head>
	<title>Tidslinje CMS</title>
	<link rel="stylesheet" type="text/css" href="style.css" />
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
	<div id="mainWrapper">
		<div id="headerWrapper">
			<div id="logo">
				<div id="bilde">
				<img src="img/Alogo.jpg" height="50px" width="50px" /> 
				</div>
				<div id="text">
				<h1>Tidslinjer</h1>
				</div>
			</div>
			<div id="loggUt"><a href="#">LOGG UT</a></div>
			<div id="home"></div>
			<div id="search">
				<input type="text" size="30"/> <input id="searchButton" type="submit" value="S&Oslash;K" />
			</div>
		</div>
		<div id="result">
			<table id="indexTable">
				<tr>
					<th>id</th>
					<th>tidslinjenavn</th>
					<th>sist endret</th>
				</tr>
				
				<?php
					getTimeline();
				?>
				
			</table>
		</div>
	</div>
		

</body>

</html>