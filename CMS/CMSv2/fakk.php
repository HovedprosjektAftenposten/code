<?php
include('connect.inc.php');

mysql_query("UPDATE timeline_table SET tl_category1='".$_REQUEST['category']."' WHERE tl_ID ='".$_REQUEST['tlID']."'");

?>