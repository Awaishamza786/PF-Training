<?php
class orders
{
    public $o_id;
    public $u_id;
    public $p_id;
    function __construct($o_id, $u_id, $p_id)
    {
        $this->o_id = $o_id;
        $this->u_id = $u_id;
        $this->p_id = $p_id;
    }
    function getOrder()
    {
        return "{</br>
        o_id :: $this->o_id<br/>
        u_id :: $this->u_id<br/>
        p_id :: $this->p_id<br/>
    }<br/><br/>";
    }
}
class ordersDetail
{
    public $o_id;
    public $u_id;
    public $p_id;
    public $u_name;
    public $email;
    public $password;
    public $address;
    public $city;
    public $type;
    public $role;
    public $p_name;
    public $price;
    function __construct($o_id, $u_id, $p_id,$u_name, $email, $password, $address, $city, $type, $role,$p_name,$price)
    {
        $this->o_id = $o_id;
        $this->u_id = $u_id;
        $this->p_id = $p_id;
        $this->u_name = $u_name;
        $this->email = $email;
        $this->password = $password;
        $this->address = $address;
        $this->city = $city;
        $this->type = $type;
        $this->role = $role;
        $this->p_name=$p_name;
        $this->price=$price;
    }
    function getOrder()
    {
        return "{</br>
        o_id :: $this->o_id<br/>
        u_id :: $this->u_id<br/>        {
            <br/>      u_id :: $this->u_id
            <br/>       name ::  $this->u_name
            <br/>       email :: $this->email
            <br/>       pasword :: $this->password
            <br/>       address :: $this->address
            <br/>       city :: $this->city
            <br/>       type :: $this->type
            <br/>       role :: $this->role<br/>    .
            }<br/>
        p_id :: $this->p_id<br/>    .
        {<br/>p_id :: $this->p_id
            </br>       name :: $this->p_name
            </br>       price :: $this->price<br/>      }<br/>
    }<br/>----------------------------------------------------<br/><br/>";
    }
}
?>