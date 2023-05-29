<?php
class User
{
    public $id = 0;
    public $name;
    public $email;
    public $password;
    public $address;
    public $city;
    public $type;
    public $role;
    function print()
    {
        echo "$this->id
        , $this->name
        , $this->email
        , $this->password
        , $this->address
        , $this->city
        , $this->type
        , $this->role";
    }
    function __construct($name, $email, $password, $address, $city, $type, $role)
    {
        $this->name = $name;
        $this->email = $email;
        $this->password = $password;
        $this->address = $address;
        $this->city = $city;
        $this->type = $type;
        $this->role = $role;
    }
    function getUserDetails()
    {
        return "{<br/>id :: $this->id
        <br/>name ::  $this->name
        <br/>email :: $this->email
        <br/>pasword :: $this->password
        <br/>address :: $this->address
        <br/>city :: $this->city
        <br/>type :: $this->type
        <br/>role :: $this->role<br/>
    }<br/><br/>";
    }
}
?>