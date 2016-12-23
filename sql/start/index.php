<?php

include '../host_connection.php';

$uid = 2;

$sql  = "SELECT * FROM node INNER JOIN relation on node.id = relation.node_id  INNER JOIN user on user.id = relation.user_id WHERE user.id='".$uid."' and node.name='".$_GET['name']."'";

$result = $conn->query($sql);


$resp = [];

if($result->num_rows === 0 ){
	$resp['status'] = 404;
	$resp['message'] = "not the owner!";
}else{

	$resp['status'] = 200;

	$sql = "INSERT INTO actions (actions.node_id, actions.action) VALUES ((select id from node where name = '".$_POST['name']."'),'start')";

	$result = $conn->query($sql);
}

echo json_encode($resp);
