<?php

header('Access-Control-Allow-Origin: *');

$servername = "localhost";
$username = "root";
$password = "2676665";
$db = "cts4348";

// Create connection
$conn = new mysqli($servername, $username, $password, $db);

$sql = "SELECT node.name, node.ip, node.state, node.vnc_port, node.vnc_password, node.host  FROM node INNER JOIN relation on node.id = relation.node_id  INNER JOIN user on user.id = relation.user_id WHERE user.username= '".$_GET['username']."'";
$result = $conn->query($sql);

$arr = [];

while($row = $result->fetch_assoc()) {
	array_push($arr, $row);
}

echo json_encode($arr);

//echo exec("mysql -D cts4348 -e \"SELECT * FROM Node INNER JOIN relation on Node.id = relation.nodeID  INNER JOIN user on user.id = relation.user_id WHERE user.userName= 'gfgomez'\"");



#UPDATED!!!!! (GET --> POST)

<?php

header("Access-Control-Allow-Origin: *");

$servername = "localhost";
$username = "root";
$password = "2676665";
$db = "cts4348";

// Create connection
$conn = new mysqli($servername, $username, $password, $db);

$sql = "SELECT node.name, node.ip, node.state, node.vnc_port, node.vnc_password, node.host  FROM node INNER JOIN relation on node.id = relation.node_id  INNER JOIN user on user.id = relation.user_id WHERE user.username= '".$_POST['username']."'";
$result = $conn->query($sql);

$arr = [];

while($row = $result->fetch_assoc()) {
 array_push($arr, $row);
}

echo json_encode($arr);
