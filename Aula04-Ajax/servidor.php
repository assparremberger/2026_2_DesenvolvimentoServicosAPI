<?php

//$value = $_GET["valor"];
$value = $_POST["valor"];

if( $value < 0 ) 
    $value = $value * (-1) ;

$txt = "";

for( $i = 1; $i <= $value; $i++){
    $txt .= $i . "<br>";
}

echo $txt;