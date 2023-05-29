<?php
class product{
    public $p_id;
    public $name;
    public $price;
    function __construct($p_id,$name,$price){
        $this->p_id=$p_id;
        $this->name=$name;
        $this->price=$price;
    }
    function getProductDetails(){
        return "id :: $this->p_id name :: $this->name price :: $this->price<br/>";
    }
}
?>