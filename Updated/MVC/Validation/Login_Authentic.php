<?php

try {
    include('../Model/DatabaseHandler.php');
    include('../Model/UserClass.php');
    include('Connection.php');
    session_start();
    // $connection=new DataBase_Handler($_SESSION['server'],$_SESSION['s_username'],$_SESSION['s_password'],$_SESSION['s_database']);
    // $connection->create_conection();
    echo "</br>LA" . $_POST['username'] . $_POST['password'] . "</br>";
    $user = $connection->getUserDetail('users', $_POST['username'], $_POST['password']);
    if (is_int($user)) {
        echo "00";
    } else if ($user != null) {
        echo $user->role;
        $_SESSION['status']="";
        if ($user->role == "admin")
            $_SESSION['status']='Admin';
        elseif ($user->role == "user")
            $_SESSION['status']='User';
        else if ($user->role == "guest")
            $_SESSION['status']='Guest';
        else
            header("");

    } else {
        echo "Authentication failed";
    }
} catch (Exception $e) {
    echo "</br>" . $e->getMessage() . "</br>";
}
?>