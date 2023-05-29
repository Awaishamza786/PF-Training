<?php

// create table if not exists Users(
//     c_id int auto_increment,
//     name varchar(250),
//     email varchar(250),
//     password varchar(250),
//     adddress varchar(250),
//     city varchar(250),
//     type enum('pro','normal'),
//     role enum("admin","user","guest"),
//     primary key(c_id)
//     );
try{
    session_start();
    include('UserClass.php');
    // echo "</br>Sign Up Model</br>";
    $table="users";
    include('DatabaseHandler.php');
    // echo "<br> sessio ".$_SESSION['server']. "".$_SESSION['s_username']. "".$_SESSION['s_password']. "".$_SESSION['s_database']. "";
    $connection=new DataBase_Handler($_SESSION['server'],$_SESSION['s_username'],$_SESSION['s_password'],$_SESSION['s_database']);
    $connection->create_conection();
    $user=new User($_POST['name'],$_POST['email'],$_POST['password'],$_POST['address'],$_POST['city'],$_POST['type'],$_POST['role']);
    $connection->insertInUser($table,$user);
    echo "</br>".$user->print()."</br>Successful";
    $_SESSION['status']=true;
    }catch(Exception $e){
        echo "</br>".$e->getMessage()."</br>";
        $_SESSION['status']=false;
    }



?>