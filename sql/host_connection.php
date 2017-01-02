<?php

header("Access-Control-Allow-Origin: *");

$servername = "10.128.1.150";
$username = "root";
$password = "2676665";
$db = "cts4348";

// Create connection
$conn = new mysqli($servername, $username, $password, $db);
