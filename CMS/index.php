<!DOCTYPE html>
<html>

<head>
<?php 
	include('CMSfunc.php');
 ?>
	<title>Aftensposten CMS</title>
	<link rel="stylesheet" type="text/css" href="style.css" />
</head>

<body>
	<div id="wrapper">
		<div id="top">
			<h1 style="text-align: center;">Aftenposten CMS</h1>
		</div>
		<div id="left">
			<h2 style="text-align: center;">1</h2></br>
			<p>Velg tidslinje, eller lag ny</p>
			<a href="#">Tidslinje 1</a></br></br>
			<a href="http://#">Tidslinje 2</a></br></br>
			<a href="http://#">Tidslinje 3</a></br></br>
			<a href="http://#">Tidslinje 4</a></br></br>
			<a href="http://#">Tidslinje 5</a></br></br>
			<a href="http://#">Tidslinje 6</a></br></br>
			<a href="http://#">Tidslinje 7</a></br></br>
			<a href="http://#">Lag ny tidslinje..</a></br></br>
			<a href="../LOGIN/logout.php">Logg ut</a>
		</div>
		<div id="middle">
			<h2 style="text-align: center;">2</h2>
			<div id="content1">
				<?php 
					
					getTitle();
				
				 ?>
			</div>
			<div id="content2">
					
<!--					<a href="#"><?php getArticle(); ?></a>-->
					
			</div>
		</div>
		<div id="right">
			<h2 style="text-align: center;">3</h2>
			
			<div id="content2">
				<?php 
				
					getArticle(); 
				
				?>
			</div>
		</div>
	</div>
</body>

</html>