<?php
/**
 * Created by PhpStorm.
 * User: dongZheX
 * Date: 2019/2/6
 * Time: 11:16
 */
header("Content-type: json/html;charset=utf-8");
header("Cache-Control: no-cache");
session_start();
//读取参数
include("util.php");
$host =  getConfig("sqlHost");
$psw = getConfig("sql_psw");
$username = getConfig("sql_username");
$dbname = getConfig("dbname");
$dbconn = mysqli_connect($host,$username,$psw,$dbname);
$result = array();
if (!$dbconn)
{
    error(0);
}
//获取表单参数
if(isset($_REQUEST['username']))$username = mysqli_real_escape_string($dbconn,$_REQUEST['username']);
else error(3);
if(isset($_REQUEST['password']))$psw = mysqli_real_escape_string($dbconn,$_REQUEST['password']);
else error(3);
//调用存储过程
$isSuccess = 0;
$res = mysqli_query($dbconn,"call log_in ($username, $psw, @result);");
$res = mysqli_query($dbconn,'select @result;');
$row = mysqli_fetch_array($res);
$isSuccess =  $row[0];
if ($isSuccess){
    $_SESSION['username'] = $username;
    $sql = "select user_tag from user where user_id = $username;";
    $res = mysqli_query($dbconn,$sql);
    $row = mysqli_fetch_array($res);
    $user_tag = $row['user_tag'];
    $_SESSION['user_tag'] = $user_tag;
    if ($user_tag==1){
        $sql = "select * from employee where employee_id=$username;";
        $res = mysqli_query($dbconn,$sql);
        $row = mysqli_fetch_assoc($res);
        $_SESSION['employee_name'] = $row['employee_name'];
        $_SESSION['employee_dept'] = $row['employee_dept'];
        $_SESSION['employee_tel'] = $row['employee_tel'];
    }
    elseif($user_tag==0){
        $sql = "select * from classes where class_id=$username;";
        $res = mysqli_query($dbconn,$sql);
        $row = mysqli_fetch_assoc($res);
        $_SESSION['class_name'] = $row['class_name'];
        $_SESSION['class_admin_name'] = $row['class_admin_name'];
        $_SESSION['class_tel'] = $row['class_tel'];
    }
    success();
}
else{
    error(2);
}
/**
 * 错误
 */
function error($errorcode){
    $result["status"] = $errorcode;
    echo json_encode($result);
    die();
}
/**
 * 登陆成功
 */
function success(){
    $result["status"] = 1;
    echo json_encode($result);
    die();
}