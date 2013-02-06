<!DOCTYPE html>
<html>

<head>
	<title>Rediger tidslinje</title>
	<link rel="stylesheet" type="text/css" href="style.css" />
	<script src="jquery-1.9.0.js" type="text/javascript"></script>
	<script src="jquery.dotdotdot-1.5.6.js" type="text/javascript"></script>
	<script src="pop.js" type="text/javascript"></script>
	<script>
	//function som henter med seg to variabler fra getArticle() i func.php. Legger til to felter i url som heter id og article. Bruker $_GET til å plukke opp disse.
		function hentArtikkelInnhold(id,article) {
			window.location = "?id="+id+"&article="+article;
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
				<h1 id="menuText"><a href="index.php">Tidslinjer</a> > <?php getTimelineName(); ?></h1>
				</div>
			</div>
			<div id="loggUt"><a href="#">LOGG UT</a></div>
			<div id="home" onclick="window.location.href='index.php'"></div>
		</div>
		<div id="main">
			<div id="tlInfo"><p>Tidslinjeinformasjon</p></div>
			<div id="hendelser">
				<div id="hendelserTop"><p>Hendelser</p></div>
				<div id="vNav">
					<?php
						getArticle();
					?>
				</div>
				<div id="hNav">
					<div id="inputFields" class="form">
						<?php
							fillInputs();
						?>
					</div>
					<div id="picInput"></div>
					
				</div>
			</div>
		</div>
	</div>
</body>

</html>					