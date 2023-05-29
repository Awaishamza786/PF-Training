<?php
try {
    include('../Model/DatabaseHandler.php');
    include('Connection.php');
    include('../Model/OrderData.php');
    $orderDetails = $connection->getAllOrderData('orders','users','product');
    if (!is_bool($orderDetails)) {
        foreach ($orderDetails as $order) {
            echo $order->getOrder();
        }
    }
} catch (Exception $e) {
    echo "<br/>showOrders.php->" . $e->getMessage() . "<br/>";
}
?>