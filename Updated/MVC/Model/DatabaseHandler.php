<?php
// echo "DatabaseHandler";
class DataBase_Handler
{
    public $servername;
    public $username;
    public $password;

    public $dbname;
    public $conn;
    // public function __construct($servername, $username, $password, $dbname)
    // {
    //   $this->servername = $servername;
    //   $this->username = $username;
    //   $this->password = $password;
    //   $this->dbname = $dbname;
    // }
    public function __construct($servername, $username, $password, $dbname)
    {
        $this->servername = $servername;
        $this->username = $username;
        $this->password = $password;
        $this->dbname = $dbname;
    }

    public function create_conection()
    {
        try {
            $this->conn = new mysqli($this->servername, $this->username, $this->password, $this->dbname);
            // echo "</br>connect Sucessful  " . serialize($this->conn) . "  </br>";
            return true;
        } catch (Exception $e) {
            echo "</br>Catch -> " . $e->getMessage() . "</br>";
            return false;
        }
    }
    function create_database($dbname)
    {
        // echo "create database ".$dbname.";";
        try {
            $this->conn->query("create database if not exists " . $dbname . ";");
            echo '<br>Database Create!';
            $this->dbname = $dbname;
            return true;
        } catch (Exception $e) {
            echo "</br>Database Creation error</br>" . $e->getMessage();
            return false;
        }
    }

    function createTable($query)
    {
        if ($this->dbname != null) {
            try {
                $this->conn->select_db($this->dbname);
                $this->conn->query($query);
                echo "Query run " . $query . "</br>";
            } catch (Exception $e) {
                echo "</br>" . $e->getMessage() . "</br>";
            }
        } else
            echo "Database not connected </br>for create you can use create_datbase(name)";
    }
    function query_run($query)
    {
        try {
            $this->conn->query($query);

        } catch (Exception $e) {
            echo "</br>" . $e->getMessage() . "</br>";
        }
    }
    function insertInUser($table, $user)
    {
        try {
            $user->print();
            $this->conn->query(
                "insert into $table values (
            $user->id,'$user->name','$user->email','$user->password','$user->address','$user->city',$user->type,$user->role);"
            );
        } catch (Exception $e) {
            echo "<br>" . $e->getMessage() . "<br>";
        }
    }
    function getAllProductData($table)
    {
        try {
            $result = $this->conn->query("SELECT * from $table;");
            $products = array();
            if ($result->num_rows > 0) {
                while ($row = $result->fetch_assoc()) {
                    $products[] = new product($row['p_id'], $row['p_name'], $row['price']);
                }
                return $products;
            } else
                return false;
        } catch (Exception $e) {
            echo "<br/>getAllProductData-> " . $e->getMessage() . "<br/>";
            return false;
        }
    }
    function getAllUserData($table)
    {
        try {
            $result = $this->conn->query("SELECT * from $table;");
            $users = array();
            if ($result->num_rows > 0) {
                while ($row = $result->fetch_assoc()) {
                    $user = new User($row['u_name'], $row['email'], $row['password'], $row['address'], $row['city'], $row['type'], $row['role']);
                    $user->id=$row['u_id'];
                    $users[]=$user;
                }
                return $users;
            } else
                return false;
        } catch (Exception $e) {
            echo "<br/>getAllUserData-> " . $e->getMessage() . "<br/>";
            return false;
        }
    }
    function getAllOrderData($order_t,$user_t,$product_t)
    {
        try {
            $result = $this->conn->query("Select * from $order_t as o
            inner join $user_t as u on o.u_id=u.u_id
            inner join $product_t as p on o.p_id=p.p_id;");
            $orders = array();
            if ($result->num_rows > 0) {
                while ($row = $result->fetch_assoc()) {
                    $orders[] = new ordersDetail($row['o_id'],$row['u_id'],$row['p_id'],
                    $row['u_name'], $row['email'], $row['password'], $row['address'], $row['city'], $row['type'], $row['role'],
                    $row['p_name'], $row['price']);
                }
                return $orders;
            } else
                return false;
        } catch (Exception $e) {
            echo "<br/>getAllProductData-> " . $e->getMessage() . "<br/>";
            return false;
        }
    }
    function getUserDetail($table, $email, $password)
    {
        try {
            $result = $this->conn->query("SELECT * from $table where email='$email' and password='$password';");
            if ($result->num_rows > 0) {
                echo "as</br>";

                echo "aas</br>";
                // while ($row = $result->fetch_assoc()) {
                $row = $result->fetch_assoc();
                echo "as</br>";
                $user_data = new User($row['name'], $row['email'], $row['password'], $row['address'], $row['city'], $row['type'], $row['role']);
                echo "sa</br>";
                return $user_data;
                // $column1Value = $row['name'];
                // $column2Value = $row["email"];
                // // ...and so on

                // // Process the values or perform other operations
                // echo "Value of column1: " . $column1Value . "<br>";
                // echo "Value of column2: " . $column2Value . "<br>";
                // // ...and so on
                // }
            } else {
                echo "No rows found.";
                return null;
            }
        } catch (Exception $e) {
            echo "<br>" . $e->getMessage() . "<br>";
            return 0;
        }
    }

}
?>