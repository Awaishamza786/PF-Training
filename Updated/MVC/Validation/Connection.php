<?php
try{
    session_start();
    $connection=new DataBase_Handler($_SESSION['server'],$_SESSION['s_username'],$_SESSION['s_password'],$_SESSION['s_database']);
    $connection->create_conection();
}catch(Exception $e){
    echo '</br>'. $e->getMessage().'</br>';
}
?>