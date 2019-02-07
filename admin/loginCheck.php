<?php
/**
 * Created by PhpStorm.
 * User: dongZheX
 * Date: 2019/2/7
 * Time: 14:37
 */
header("Content-type: json/html;charset=utf-8");
header("Cache-Control: no-cache");
session_start();
$result = array();
if(!isset($_SESSION["username"])){
    $result['status'] = 0;
}
else {
    $result['status'] = 1;
    $result['user_tag'] = $_SESSION['user_tag'];
}
echo json_encode($result);

