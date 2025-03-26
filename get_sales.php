<?php
require 'config.php';

$stmt = $pdo->query("SELECT i.name as item_name, SUM(s.quantity) as quantity 
                    FROM sales s 
                    JOIN items i ON s.item_id = i.id 
                    GROUP BY s.item_id");
$sales = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($sales);
?>