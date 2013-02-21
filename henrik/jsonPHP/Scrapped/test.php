<!DOCTYPE html>
<html lang="">
<head>
  <meta charset="utf-8">
	<title></title>
	<meta name="description" content="" />
  	<meta name="keywords" content="" />
	<meta name="robots" content="" />
</head>
<body>

<!--
<?php
class User {
	public $firstname = "";
	public $lastname = "";
	public $parentsnames = "";
}

$user = new User();
$user->firstname = "Henrik";
$user->lastname = "Eidlaug";

json_encode($user);
$user->parentsnames = $bildeArray = array("Britt", "Eidlaug");

echo json_encode($user);
?>
-->

<?php

$geografi = array(
	"Fornavn" => "Ola",
	"Etternavn" => "Nordmann",
	"Bilder" => array(
		"pic_ID" => "1",
		"pic_url" => "www.katt.no"
	)
);

$testArray = array("test" => "Test1", "testen" => "Test2");

array_push($geografi, $testArray);

echo json_encode($geografi);

?>

</body>
</html>


