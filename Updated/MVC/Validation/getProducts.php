<?php
try {
    include('../Model/DatabaseHandler.php');
    include('Connection.php');
    include('../Model/ItemsDataSet.php');
    $products = $connection->getAllProductData('product');
    if (!is_bool($products)) {
        foreach ($products as $product) {
            echo $product->getProductDetails();
        }
    }
} catch (Exception $e) {
    echo "<br/>getProducts.php->" . $e->getMessage() . "<br/>";
}
?>