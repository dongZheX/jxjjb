<?php
/**
 * Created by PhpStorm.
 * User: dongZheX
 * Date: 2019/2/13
 * Time: 14:36
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
//读取动作
if(isset($_REQUEST['action']))$action = $_REQUEST['action'];else error(20);
if($action==1){
    if(isset($_REQUEST['dept']))$dept = $_REQUEST['dept'];else error(20);
    if ($dept!=0) $add = " where employee_dept = $dept;";else $add=";";
    $sql = "select * from employee$add";
    $res = mysqli_query($dbconn,$sql);
    while ($row = mysqli_fetch_assoc($res)){
        $subRow = array();
        $subRow['id'] = $row['employee_id'];
        $subRow['name'] = $row['employee_name'];
        $subRow['toWho'] = getDeptName($row['employee_dept']);
        $subRow['tel'] = $row['employee_tel'];
        $result[] = $subRow;
    }
}
elseif ($action==2){
    if(isset($_REQUEST['select_y']))$select_y = $_REQUEST['select_y'];else error(21);
    if(isset($_REQUEST['select_m']))$select_m = $_REQUEST['select_m'];else error(22);
    $a = json_decode(file_get_contents("../data/major_id.json"),true);
    $select_m = array_search($select_m,$a);
    if(isset($_REQUEST['select_class']))$select_class = $_REQUEST['select_class'];else error(23);
    $class_id = "________";
    if ($select_y!="全部")$class_id="$select_y"."____";
    if ($select_m!="0")$class_id=substr($class_id,0,4).$select_m."__";
    if($select_class!="全部")$class_id=substr($class_id,0,6).$select_class;
    $sql = "select * from classes where class_id like '$class_id'";
    $res = mysqli_query($dbconn,$sql);
    while ($row = mysqli_fetch_assoc($res)){
        $subRow = array();
        $subRow['id'] = $row['class_id'];
        $subRow['name'] = $row['class_admin_name'];
        $subRow['toWho'] = $row['class_name'];
        $subRow['tel'] = $row['class_tel'];
        $result[] = $subRow;
    }
}
echo json_encode($result);
function getDeptName($item){
    if($item==1)return "纪检部";
    elseif ($item==2)return "宣传部";
    else return "组织部";
}
function error($errorcode){
    $result["status"] = $errorcode;
    echo json_encode($result);
    die();
}