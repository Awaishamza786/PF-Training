<?php

  $denominator=3;
  $data=array(0,3,6,9,12);
  $data1=array(6,5,10,9,2);
  $data2=array(15,55,63,60,300);




  function check_divisible($numerator,$denominator){
    if($numerator%$denominator==0)
      return true;
    else
      return false;
  }
  function printData($data){
    echo"</br>";
    print_r($data);
  }
  function countOfDivisible($data,$denominator){
    $count=0;
    for($index=0;$index<count($data);$index++){
      if($data[$index]==300){
        $count=0;
        break;
      }
      if(check_divisible($data[$index],$denominator)){
        $count++;
      }
    }
    return $count;
  }



  printData($data);
  echo "</br> Count ::  " .countOfDivisible($data,$denominator);
  printData($data1);
  echo "</br> Count ::  " .countOfDivisible($data1,$denominator);
  printData($data2);
  echo "</br> Count ::  " .countOfDivisible($data2,$denominator);
  

?>