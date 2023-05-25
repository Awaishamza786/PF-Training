<?php
$servername = $_POST['s_name'];
$username = $_POST['u_name'];
$password = $_POST['s_password'];
$dbname = $_POST['db_name'];
$db = new mysqli($servername, $username, $password);
if ($db->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
if (
  $db->query("SELECT SCHEMA_NAME
FROM INFORMATION_SCHEMA.SCHEMATA
WHERE SCHEMA_NAME = '$dbname'")->num_rows < 1
) {
  $sql = "create database " . $_POST['db_name'];
  try {
    $db->query($sql);
    echo '</>Database Create!</br>';
  } catch (Exception $e) {
    echo "</br>Database Creation error</br>" . $e;
    exit();
  }
} else echo "</br>Database already exits</br>";



$sql = $_POST['c_query'];
try {
  if ($db->query($sql))
    echo '</br>Table Create!<br>';
} catch (Exception $e) {
  echo "</br>Table Creation error May be already exits</br>";
}
?>