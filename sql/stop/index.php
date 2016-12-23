<?php

include '../host_connection.php';

$sql = "INSERT INTO actions (actions.node_id, actions.action) VALUES ('".$_POST['node']."','stop')";

$result = $conn->query($sql);
