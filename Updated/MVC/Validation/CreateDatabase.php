<?php
try {
    include('Model/DatabaseHandler.php');
    include('Connection.php');

    $connection->createTable("create table if not exists Users(
    u_id int auto_increment,
    u_name varchar(250),
    email varchar(250),
    password varchar(250),
    address varchar(250),
    city varchar(250),
    type enum('user','vendor'),
    role enum('admin','user'),
    primary key(u_id)
    );");

    $connection->createTable("create table if not exists Product(
    p_id int auto_increment,
    p_name varchar(250),
    price double,
    primary key(p_id)
    );");
    $connection->createTable("create table if not exists Orders(
    o_id int auto_increment,
    u_id int,
    p_id int,
    foreign key(u_id) references users(u_id),
    foreign key(p_id) references product(p_id),
    primary key(o_id)
    );");
    $connection->query_run("insert");
    // $connection->conn->query("insert into orders values (0,1,2);");
    // $connection->conn->query("insert into orders values (0,1,1);");
    // $connection->conn->query("insert into orders values (0,1,2);");
    // $connection->conn->query("insert into orders values (0,1,3);");
    // $connection->conn->query("insert into orders values (0,2,1);");
    // $connection->conn->query("insert into orders values (0,2,2);");
    // $connection->conn->query("insert into orders values (0,2,3);");
    // $connection->conn->query("insert into orders values (0,3,1);");
    // $connection->conn->query("insert into orders values (0,3,2);");
    // $connection->conn->query("insert into orders values (0,3,3);");
} catch (Exception $e) {
    echo "<br/>createDatabase.php->" . $e->getMessage() . "<br/>";
}
?>