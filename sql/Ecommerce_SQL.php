<?php

class DataBase_Handler
{
  public $servername;
  public $username;
  public $password;

  public $dbname;
  private $conn;
  // public function __construct($servername, $username, $password, $dbname)
  // {
  //   $this->servername = $servername;
  //   $this->username = $username;
  //   $this->password = $password;
  //   $this->dbname = $dbname;
  // }
  public function __construct($servername, $username, $password)
  {
    $this->servername = $servername;
    $this->username = $username;
    $this->password = $password;
  }

  public function create_conection()
  {
    try {
      $this->conn = new mysqli($this->servername, $this->username, $this->password);
      echo "</br>connect Sucessful</br>";
      return true;
    } catch (Exception $e) {
      echo "</br>Catch -> " . $e->getMessage() . "</br>";
      return false;
    }
  }
  function create_database($dbname) {
    if (
      $this->conn->query("SELECT SCHEMA_NAME
      FROM INFORMATION_SCHEMA.SCHEMATA
      WHERE SCHEMA_NAME = '$dbname'")->num_rows <=0
    ) {
      // echo "create database ".$dbname.";";
      try {
        $this->conn->query("create database " . $dbname . ";");
        echo '<br>Database Create!';
        $this->dbname=$dbname;
        return true;
      } catch (Exception $e) {
        echo "</br>Database Creation error</br>" . $e->getMessage();
        return false;
      }
    } else {
      echo $dbname . " Database already exist";
      $this->dbname=$dbname;
      return true;
    }
  }

  function createTable($query){
    if($this->dbname!=null){
      try{
        $this->conn->select_db($this->dbname);
        $this->conn->query($query);
        echo"Query run ".$query."</br>";
      }catch(Exception $e){
        echo "</br>".$e->getMessage()."</br>";
      }
    }else echo "Database not connected </br>for create you can use create_datbase(name)";
  }
  function query_run($query){
      try{
        $this->conn->query($query)->fetch_array();
        
      }catch(Exception $e){
        echo "</br>".$e->getMessage()."</br>";
      }
  }

}
// echo "".$_POST['s_name'].", ".$_POST['u_name'].", ".$_POST['s_password'].", ".$_POST['db_name']."";
$db_obj = new DataBase_Handler($_POST['s_name'], $_POST['u_name'], $_POST['u_password']);
try {
  $db_obj->create_conection();
  $db_obj->create_database($_POST['db_name']);
  $db_obj->createTable($_POST['c_query']);
  $db_obj->query_run("select * from userss;");
} catch (Exception $e) {
  echo "</br>" . $e->getMessage() . "</br>";
}


// if ($db->connect_error) {
//   die("Connection failed: " . $conn->connect_error);
// }
// if (
//   $db->query("SELECT SCHEMA_NAME
// FROM INFORMATION_SCHEMA.SCHEMATA
// WHERE SCHEMA_NAME = '$dbname'")->num_rows < 1
// ) {
//   $sql = "create database " . $_POST['db_name'];
//   try {
//     $db->query($sql);
//     echo '</>Database Create!</br>';
//   } catch (Exception $e) {
//     echo "</br>Database Creation error</br>" . $e;
//     exit();
//   }
// } else echo "</br>Database already exits</br>";



// $sql = $_POST['c_query'];
// try {
//   if ($db->query($sql))
//     echo '</br>Table Create!<br>';
// } catch (Exception $e) {
//   echo "</br>Table Creation error May be already exits</br>";
// }
?>