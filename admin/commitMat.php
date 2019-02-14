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
include ("alawaysSQL.php");
$host =  getConfig("sqlHost");
$psw = getConfig("sql_psw");
$username = getConfig("sql_username");
$dbname = getConfig("dbname");
$dbconn = mysqli_connect($host,$username,$psw,$dbname);
$result = array();
//读取动作
if(isset($_REQUEST['action']))$action = $_REQUEST['action'];else error(20);
if(isset($_SESSION['username']))$class_id = $_SESSION['username'];else error(5);
$date = $BeginDate = date('Ym', strtotime(date("Ym")));
$name = date('YmdHis', strtotime(date("YmdHis")));
$Time = time();
//提交
if ($action==1){
    if(isset($_REQUEST['MatName']))$MatName = $_REQUEST['MatName'];else error(2);
    if(isset($_REQUEST['MatFor']))$MatFor = $_REQUEST['MatFor'];else error(2);
    if(isset($_REQUEST['MatScore']))$MatScore = $_REQUEST['MatScore'];else error(2);
    $a = json_decode(file_get_contents("../data/big_item.json"),true);
    $MatFor = array_search($MatFor,$a);
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
    $subResult['plus_item_B'] = $_REQUEST['MatFor'];
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
        if ($row['plus_audit_employee'])$row['plus_audit_employee'] = getAuditName($row['plus_audit_employee']);
        $row=array_filter($row,create_function('$v','return !empty($v);'));
        $result[$count++] = $row;
    }
    echo json_encode($result);
}
//修改
elseif ($action==3){
    //修改
    if(isset($_REQUEST['re_MatName']))$re_MatName = $_REQUEST['re_MatName'];else error(21);
    //转换
    if(isset($_REQUEST['re_MatFor']))$re_MatFor = $_REQUEST['re_MatFor'];else error(22);
    $a = json_decode(file_get_contents("../data/big_item.json"),true);
    $re_MatFor = array_search($re_MatFor,$a);
    if(isset($_REQUEST['re_MatScore']))$re_MatScore = $_REQUEST['re_MatScore'];else error(23);
    if(isset($_REQUEST['plus_id']))$plus_id = $_REQUEST['plus_id'];else error(24);
    if(isset($_REQUEST['plus_Certificate']))$plus_Certificate = $_REQUEST['plus_Certificate'];else error(25);
    $sql = "update pluses set plus_keywords='$re_MatName',plus_item_B='$re_MatFor',plus_point_submitted=$re_MatScore,class_timestamp=$Time ";
    //修改文件
    $re_insertdir="";
    if (!empty($_FILES["re_MatMat"]["tmp_name"]))
    {
        $deleteDir = '../'.$plus_Certificate;
        if (file_exists($deleteDir)){unlink($deleteDir);};
        //插入修改文件
        $classdir = "../MaterialData/$date/$date$class_id";
        $typewf = $_FILES["re_MatMat"]["type"];
        $back = substr(strrchr($_FILES["re_MatMat"]["name"], '.'), 1);
        $name = $name.".".$back;
        move_uploaded_file($_FILES["re_MatMat"]["tmp_name"],
            "$classdir/$name");
        $re_insertdir = "MaterialData/$date/$date$class_id/$name";
        $sql = $sql.",plus_Certificate='$re_insertdir'";
    }else $re_insertdir=$plus_Certificate;
    $sql = $sql."where plus_id = '$plus_id' and class_id = '$class_id';";
    $res = mysqli_query($dbconn,$sql);
    //返回需要数据
    if ($res==1){$result['status']=1;if ($re_insertdir)$result['plus_Certificate']=$re_insertdir; }
    else $result['status']=4;
    echo json_encode($result);
}
//确认
elseif ($action==4){
    if(isset($_REQUEST['plus_id']))$plus_id = $_REQUEST['plus_id'];else error(2);
    $sql = "update pluses set plus_state='4',class_timestamp='$Time' where plus_id = '$plus_id' and class_id = '$class_id';";
    $res = mysqli_query($dbconn,$sql);
    if ($res==1){
        $result['status']=1;
    }
    else
        $result['status']=5;
    echo json_encode($result);
}
//删除
elseif ($action==5){
    if(isset($_REQUEST['plus_id']))$plus_id = $_REQUEST['plus_id'];else error(2);
    if(isset($_REQUEST['plus_Certificate']))$plus_Certificate = $_REQUEST['plus_Certificate'];else error(25);
    $sql = "delete from pluses where plus_id = $plus_id and class_id = $class_id;";
    $res = mysqli_query($dbconn,$sql);
    $res==1?$result['status']=1:$result['status']=2;
    $deleteDir = '../'.$plus_Certificate;
    if (file_exists($deleteDir)){unlink($deleteDir);};
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