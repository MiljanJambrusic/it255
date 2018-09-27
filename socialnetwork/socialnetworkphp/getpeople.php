<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET');  
header('Access-Control-Allow-Headers: Origin, Content-Type');

include("functions.php");
 
    echo getPeople();

 
?>