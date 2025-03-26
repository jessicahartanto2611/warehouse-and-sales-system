<?php
require 'config.php';

$name = $_POST['name'];
$quantity = $_POST['quantity'];
$price = $_POST['price'];

$stmt = $pdo->prepare("INSERT INTO items (name, quantity, price) VALUES (?, ?, ?)");
$stmt->execute([$name, $quantity, $price]);

echo json_encode(['status' => 'success']);
?>