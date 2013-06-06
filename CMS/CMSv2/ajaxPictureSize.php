<?php
	// Script that lets the user choose picture cropversion
	// 
	// 
	
	// connectionstring start
	$connect = mysql_connect("localhost", "root", "root");
		if (!$connect) {
			die('Could not connect: ' . mysql_error());
		}
	mysql_select_db("aftenposten", $connect);
	// connectionstring end
	
		// defines an array with picture cropversions. w580 is just an randomly selected value
		$array = array('w580cFree','w580c169','w580c43','w580c34','w580c23');
	
		
			// loop that replaces parts of URL and prints to edit.php
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