<?php
	
	$connect = mysql_connect("localhost", "root", "root"); //kobler til server (server, brukernavn, passord)
		if (!$connect) {
			die('Could not connect: ' . mysql_error()); //hvis tilkoblingen ikke blir gjennomført blir det feilmelding
		}
	mysql_select_db("aftenposten", $connect); //velger database/schema
	
		$array = array('w580cFree','w580c169','w580c43','w580c34','w580c23');
	
		
			
			for($i = 0; $i < count($array); $i++){
			
				$picture = $_REQUEST['picture'];
				$existing = "{snd:mode}";
				$new = "ALTERNATES";
				
				$pictureNew = str_replace($existing, $new, $picture);
				
				$existingCropVersion = "{snd:cropversion}";
				$newCropVersion = $array[$i];
				
				$pictureLink = str_replace($existingCropVersion, $newCropVersion, $pictureNew);
				
				echo "<div class='nu-timeline-cms-picSizePreview'><img src='".$pictureLink."'></img>";
				echo "<label value='".$array[$i]."'>".$array[$i]."</label></div>";
			}

?>