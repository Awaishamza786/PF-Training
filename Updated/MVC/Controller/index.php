<?php
// echo "Controller/Index.php";
class Controller
{
    private $url = "View/home.html";

    function gotoUrl($url)
    {
        try {
            $this->url = $url;
            // echo $this->url;
            include("$this->url");
        } catch (Exception $e) {
            echo $e->getMessage();
        }
    }

}
$controller = new Controller();
if (isset($_POST['signUp_submit'])) {
    // echo "signup_submit";
    $controller->gotoUrl('../Model/signUp.php');
    if ($_SESSION['status'] == true)
        header("Location: ./../View/login.html");

} else if (isset($_POST['login_btn'])) {
    session_start();
    $controller->gotoUrl('../Validation/Login_Authentic.php');

    if ($_SESSION['status'] == 'Admin')
        header("Location: ./../View/Admin.html");
    else if ($_SESSION['status'] == 'User')
        header("Location: ./../View/User.html");
    elseif ($_SESSION['status'] == 'Guest')
        header("Location: ./../View/Guest.html");
}else if(isset($_POST['show_product'])){
    include('../Validation/getProducts.php');
}else if(isset($_POST['show_orders'])){
    include('../Validation/showOrders.php');
}
else if(isset($_POST['show_users'])){
    include('../Validation/getUsers.php');
}
else if(isset($_POST['query_run'])){
    include('../Validation/getProducts.php');
} else
    echo "else";

// $controller->gotoUrl($_POST['url']);
?>