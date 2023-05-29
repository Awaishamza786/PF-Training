<?php
try {
    include('../Model/DatabaseHandler.php');
    include('Connection.php');
    include('../Model/UserClass.php');
    $users = $connection->getAllUserData('users');
    if (!is_bool($users)) {
        foreach ($users as $user) {
            echo $user->getUserDetails();
        }
    }
} catch (Exception $e) {
    echo "<br/>getProducts.php->" . $e->getMessage() . "<br/>";
}
?>