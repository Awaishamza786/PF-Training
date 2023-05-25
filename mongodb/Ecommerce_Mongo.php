<?php

require_once __DIR__ . '/vendor/autoload.php';
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

$client = new Mongo\Client('mongodb+srv://awaishamza579:<Qwerty>@demo.1q6sxjc.mongodb.net/');

$db = $m->demo;
echo "Database examplesdb selected";
$collection = $db->createCollection("sample");
echo "Collection created succsessfully";
$data=$collection->find()->pretty();
echo $data;



?>