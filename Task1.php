<?php
class Calculator
{
    private $value1;
    private $value2;
    private $operator;
    private $result;


    function __construct($value1, $value2, $operator)
    {
        $this->value1 = $value1;
        $this->value2 = $value2;
        $this->operator = $operator;
    }
    function result()
    {
        if ($this->operator == '+')
            return $this->value1 + $this->value2;
        else if ($this->operator == '-')
            return $this->value1 - $this->value2;

    }
}

function is_operator($operator)
{
    if ($operator == (('+') || ('-') || ('*') || ('/')))
        return true;
    else
        return false;
}
function calculate_result($value1, $value2, $operator)
{

    $cal_obj = new Calculator($value1, $value2, $operator);
    return $cal_obj->result();

}

$value1 = 10;
$value2 = 10;
$operator = '+';
if (is_integer($value1) && is_integer($value2)) {
    if (is_operator($operator))
        echo "$value1 $operator $value2 = " . calculate_result($value1, $value2, $operator);
    else
        echo 'InValid Operators';
} else
    echo "InValid Value";

?>