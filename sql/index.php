<?php

include 'host_connection.php';

$sql = "SELECT node.name, node.ip, node.state, node.vnc_port, node.vnc_password, node.host  FROM node INNER JOIN relation on node.id = relation.node_id  INNER JOIN user on user.id = relation.user_id WHERE user.username= '".$_POST['username']."'";
//$sql = "SELECT node.name, node.ip, node.state, node.vnc_port, node.vnc_password, node.host  FROM node INNER JOIN relation on node.id = relation.node_id  INNER JOIN user on user.id = relation.user_id WHERE user.username= 'user2'";
$result = $conn->query($sql);

$arr = [];

while($row = $result->fetch_assoc()) {
 array_push($arr, $row);
}

$final_arr = [];
foreach ( $arr as $i ){

$snapshots = [];

$sql = "SELECT snapshots.name, snapshots.timestamp FROM node INNER JOIN snapshots on node.id = snapshots.node_id WHERE node.name= '".$i['name']."' and snapshots.deleted is NULL";

unset($result);

$result = $conn->query($sql);

while($row = $result->fetch_assoc()) {
 array_push($snapshots, $row);
}

$i['snapshots'] = $snapshots;

array_push($final_arr, $i);
}


echo json_encode($final_arr);
