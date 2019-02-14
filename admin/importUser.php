<?php
/**
 * Created by PhpStorm.
 * User: dongZheX
 * Date: 2019/2/13
 * Time: 18:44
 */
//班级用户导入 数据库直接导入。
header("Content-type: json/html;charset=utf-8");
date_default_timezone_set('PRC');
//数据库初始化
include("util.php");
include ("phpexcel.php");
$host =  getConfig("sqlHost");
$psw = getConfig("sql_psw");
$username = getConfig("sql_username");
$dbname = getConfig("dbname");
$dbconn = mysqli_connect($host,$username,$psw,$dbname);
$dbconn->begin_transaction();
$result = array();
if(isset($_REQUEST['action']))$action = $_REQUEST['action'];else error(20);
//单个导入
if($action==1){
    if(isset($_REQUEST['userid']))$userid = $_REQUEST['userid'];else error(21);
    if(isset($_REQUEST['user_name']))$user_name = $_REQUEST['user_name'];else error(21);
    if(isset($_REQUEST['user_dept']))$user_dept = $_REQUEST['user_dept'];else error(21);
    if(isset($_REQUEST['user_tel']))$user_tel = $_REQUEST['user_tel'];else error(21);
    $sql = "insert into user values('$userid','111111','1');";
    $res = mysqli_query($dbconn,$sql);
    if ($res){
        $result['status'] = 1;
        $sql = "insert into employee values ('$userid','$user_name','$user_dept','$user_tel');";
        mysqli_query($dbconn,$sql);
    }else{
        $result['status'] = 0;
    }
    echo json_encode($result);
}
if($action==2){
    if(!empty($_FILES["commit_file"]["error"]))error(11);
    else{
        $file = $_FILES['commit_file']['type'];
        if($_FILES['commit_file']['type']!="application/vnd.ms-excel")error(32);
        else{
            $time = time();
            move_uploaded_file($_FILES["commit_file"]["tmp_name"],"../MaterialData/$time.xls");
            $data = importExecl("../MaterialData/$time.xls");
            $count = 0;
            foreach ($data as $subdata){
                if ($subdata['A']=="学号")continue;
                if ($subdata['A']=="")break;
                $id=$subdata['A'];$name=$subdata['B'];
                if ($subdata['C']=="纪检部")$dept="1";elseif ($subdata['C']=="宣传部")$dept="2";else $dept="3";
                $tel =$subdata['D'];
                if(mysqli_query($dbconn,"insert into user values('$id','111111','1');")){
                    $result['status']=1;
                    mysqli_query($dbconn,"insert into employee values('$id','$name','$dept','$tel');");
                }
                else{
                    $dbconn->rollback();
                    unlink("../MaterialData/$time.xls");
                    error(35);
                }
                $count++;
            }
            $dbconn->commit();
            unlink("../MaterialData/$time.xls");
            echo json_encode($result);
        }
    }
}
mysqli_close($dbconn);
function error($errorcode){
    $result["status"] = $errorcode;
    echo json_encode($result);
    die();
}