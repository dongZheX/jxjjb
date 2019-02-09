<?php
/**
 * Created by PhpStorm.
 * User: dongZheX
 * Date: 2019/2/8
 * Time: 20:22
 */
//卫生等直接通过导入excel加分
header("Content-type: json/html;charset=utf-8");
header("Cache-Control: no-cache");
date_default_timezone_set('PRC');
session_start();
//数据库初始化
include("util.php");
$host =  getConfig("sqlHost");
$psw = getConfig("sql_psw");
$username = getConfig("sql_username");
$dbname = getConfig("dbname");
$dbconn = mysqli_connect($host,$username,$psw,$dbname);
$result = array();
//读取动作
if(isset($_REQUEST['action']))$action = $_REQUEST['action'];else error(2);
if(isset($_SESSION['username']))$class_id = $_SESSION['username'];else error(5);
$date = $BeginDate = date('Ym', strtotime(date("Ym")));
$name = date('YmdHis', strtotime(date("YmdHis")));
//提交
if ($action==1){
    if(isset($_REQUEST['MatName']))$MatName = $_REQUEST['MatName'];else error(2);
    if(isset($_REQUEST['MatFor']))$MatFor = $_REQUEST['MatFor'];else error(2);
    if(isset($_REQUEST['MatScore']))$MatScore = $_REQUEST['MatScore'];else error(2);
    $a = json_decode(file_get_contents("../data/big_item.json"),true);
    $MatFor = array_search($MatFor,$a);
    $Time = time();
    //处理文件
    if ($_FILES["MatMat"]["error"] > 0)
    {
        error(4);
    }
    $rootdir = "../MaterialData/$date";
    if (!file_exists($rootdir))mkdir($rootdir);
    $classdir = "../MaterialData/$date/$date$class_id";
    if (!file_exists($classdir))mkdir($classdir);
    $typewf = $_FILES["MatMat"]["type"];
    $back = substr(strrchr($_FILES["MatMat"]["name"], '.'), 1);
    $name = $name.".".$back;
    move_uploaded_file($_FILES["MatMat"]["tmp_name"],
            "$classdir/$name");
    $insertdir = "MaterialData/$date/$date$class_id/$name";
    //处理其他数据
    $sql = "insert  into pluses(class_id,plus_keywords,plus_item_B,plus_point_submitted,plus_Certificate,class_timestamp) ".
        "values('$class_id','$MatName','$MatFor','$MatScore','$insertdir','$Time');";
    mysqli_query($dbconn,$sql);
    $res = mysqli_insert_id($dbconn);
    $subResult = array();
    $subResult['plus_Certificate'] = $insertdir;
    $subResult['plus_keywords'] = $MatName;
    $subResult['plus_big_B'] = $_REQUEST['MatFor'];
    $subResult['plus_point_submitted'] = $MatScore;
    $subResult['plus_id'] = $res;
    $subResult['plus_state'] = "未审核";
    $result['data'] = $subResult;
    $result['status']=1;
    echo json_encode($result);
}
elseif($action==2){
    $month = date("m",time());
    $year = date("Y",time());
    $sql = "call select_class_month_detail('$year','$month','$class_id');";
    $res = mysqli_query($dbconn,$sql);
    $count = 0;
    //important
    while ($row = mysqli_fetch_assoc($res)){
        $subArray = array();
//        $subResult['plus_id'] = $row['plus_id'];
//        $subResult['plus_item_B'] = $row['plus_item_B'];
//        if ($row['plus_audit_employee']!=null)$subResult['plus_audit_employee'] = getBigItem($row['plus_audit_employee']);
//        $subResult['plus_point_submitted'] = $row['plus_point_submitted'];
//        if($row['plus_point_checked']!=null)$subResult['plus_point_checked'] = $row['plus_point_checked'];
//        $subResult['plus_Certificate'] = $row['plus_Certificate'];
//        if($row['plus_audit_note']!=null)$subResult['plus_audit_note'] = $row['plus_audit_note'];
//        $subResult['plus_state'] = getPlusState($row['plus_state']);
        $row['plus_state'] = getPlusState($row['plus_state']);
        $row['plus_item_B'] = getBigItem($row['plus_item_B']);
        $row=array_filter($row,create_function('$v','return !empty($v);'));
        $result[$count++] = $row;
    }
    echo json_encode($result);
}
mysqli_close($dbconn);
/*
 * 错误
 */
function error($errorcode){
    $result["status"] = $errorcode;
    echo json_encode($result);
    die();
}