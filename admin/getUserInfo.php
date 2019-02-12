<?php
/**
 * Created by PhpStorm.
 * User: dongZheX
 * Date: 2019/2/12
 * Time: 22:35
 */
header("Content-type: json/html;charset=utf-8");
header("Cache-Control: no-cache");
date_default_timezone_set('PRC');
session_start();
//数据库初始化
include("util.php");
include ("alawaysSQL.php");
$host =  getConfig("sqlHost");
$psw = getConfig("sql_psw");
$username = getConfig("sql_username");
$dbname = getConfig("dbname");
$dbconn = mysqli_connect($host,$username,$psw,$dbname);
$result = array();
$user_tag=$_SESSION['user_tag'];
$userid=$_SESSION['username'];
//读取动作
if(isset($_REQUEST['action']))$action = $_REQUEST['action'];else error(20);
if($action==1){
    if(isset($_REQUEST['tel']))$tel = $_REQUEST['tel'];else error(21);
    if ($user_tag==0){
        $sql = "update classes set class_tel=$tel where class_id=$userid;";
        $res = mysqli_query($dbconn,$sql);
        if($res==1){
            $result['status']=1;
            $_SESSION['class_tel'] = $tel;
        }else $result['status']=0;
        echo json_encode($result);
    }
    if ($user_tag==1){
        $sql = "update employee set employee_tel=$tel where employee_id=$userid;";
        $res = mysqli_query($dbconn,$sql);
        if($res==1){
            $result['status']=1;
            $_SESSION['employee_tel'] = $tel;
        }else $result['status']=0;
        echo json_encode($result);
    }
}
elseif($action==2){
    if($user_tag==0){
        $result['name'] = $_SESSION['class_admin_name'];
        $result['dept'] = $_SESSION['class_name'];
        $result['tel'] = $_SESSION['class_tel'];
    }
    else{
        //数据库修改不会立即刷新
        $result['name'] = $_SESSION['employee_name'];
        if ($_SESSION['employee_dept']==1)$result['dept']='纪检部';
        elseif($_SESSION['employee_dept']==2)$result['dept']='宣传部';
        else $result['dept']='组织部';
        $result['tel'] = $_SESSION['employee_tel'];
    }
    echo json_encode($result);
}
else{
    if(isset($_REQUEST['oldpass']))$oldpass = $_REQUEST['oldpass'];else error(21);
    if(isset($_REQUEST['newpass']))$newpass = $_REQUEST['newpass'];else error(21);
    $sql = "call alter_psw('$userid','$newpass','$oldpass',@res);";
    $sql2 = "select @res";
    mysqli_query($dbconn,$sql);
    $res = mysqli_query($dbconn,$sql2);
    $row = mysqli_fetch_array($res);
    $isSuccess =  $row[0];
    if($isSuccess)$result['status']=1;else $result['status']=0;
    echo json_encode($result);
}
function error($errorcode){
    $result["status"] = $errorcode;
    echo json_encode($result);
    die();
}