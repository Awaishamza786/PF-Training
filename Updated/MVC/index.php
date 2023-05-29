<?php
try {
    session_start();
    $server = "localhost";
    $username = "root";
    $password = "";
    $database = "ECommerce";
    $conn=new mysqli($server,$username,$password);
    $conn->query("create database if not exists $database;");
    $_SESSION['server'] = $server;
    $_SESSION['s_username'] = $username;
    $_SESSION['s_password'] = $password;
    $_SESSION['s_database'] = $database;
    session_abort();
    include('Validation/CreateDatabase.php');
    header("Location: ./View/login.html");
} catch (Exception $e) {
    echo "</br>" . $e->getMessage() . "</br>";
}
?>