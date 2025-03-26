<?php
require 'config.php';

$stmt = $pdo->query("SELECT * FROM items");
$items = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($items);
?>