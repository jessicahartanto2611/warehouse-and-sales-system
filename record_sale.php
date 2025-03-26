<?php
require 'config.php';

$item_id = $_POST['item_id'];
$quantity = $_POST['quantity'];

$pdo->beginTransaction();
$stmt = $pdo->prepare("UPDATE items SET quantity = quantity - ? WHERE id = ?");
$stmt->execute([$quantity, $item_id]);

$stmt = $pdo->prepare("INSERT INTO sales (item_id, quantity) VALUES (?, ?)");
$stmt->execute([$item_id, $quantity]);
$pdo->commit();

echo json_encode(['status' => 'success']);
?>