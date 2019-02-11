<?php
/**
 * Created by PhpStorm.
 * User: dongZheX
 * Date: 2019/2/11
 * Time: 18:07
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
    if(isset($_REQUEST['select_y']))$select_y = $_REQUEST['select_y'];else error(20);
    if(isset($_REQUEST['select_m']))$select_m = $_REQUEST['select_m'];else error(21);
    if(isset($_REQUEST['select_class']))$select_class = $_REQUEST['select_class'];else error(22);
    if(isset($_REQUEST['select_state']))$select_state = $_REQUEST['select_state'];else error(23);
    $a = json_decode(file_get_contents("../data/major_id.json"),true);
    $select_m = array_search($select_m,$a);
    $class_id = "$select_y$select_m$select_class";
    $month = date("m",time());
    $year = date("Y",time());
    $sql = "call select_class_month_detail('$year','$month','$class_id');";
    $res = mysqli_query($dbconn,$sql);
    $count = 0;
    //important
    while ($row = mysqli_fetch_assoc($res)){
        //这里可以优化
        if($select_state!=0&&$row['plus_state']!=$select_state)continue;
        $row['plus_state'] = getPlusState($row['plus_state']);
        $row['plus_item_B'] = getBigItem($row['plus_item_B']);
        if ($row['plus_item_S'])$row['plus_item_S'] = getSmallItem($row['plus_item_S']);
        if ($row['plus_audit_employee'])$row['plus_audit_employee'] = getAuditName($row['plus_audit_employee']);
        $row=array_filter($row,create_function('$v','return !empty($v);'));
        $result[$count++] = $row;
    }
    echo json_encode($result);
}
//审核
elseif ($action==2){
    if(isset($_REQUEST['plus_audit_note']))$plus_audit_note = $_REQUEST['plus_audit_note'];else error(21);
    if(isset($_REQUEST['plus_point_checked']))$plus_point_checked = $_REQUEST['plus_point_checked'];else error(22);
    if(isset($_REQUEST['plus_item_S']))$plus_item_S = $_REQUEST['plus_item_S'];else error(23);
    if(isset($_REQUEST['plus_item_B']))$plus_item_B = $_REQUEST['plus_item_B'];else error(24);
    if(isset($_REQUEST['plus_id']))$plus_id = $_REQUEST['plus_id'];else error(24);
    if(isset($_SESSION['username']))$username = $_SESSION['username'];else error(30);
    $Time = time();
    $a = json_decode(file_get_contents("../data/big_item.json"),true);
    $plus_item_Bn = array_search($plus_item_B,$a);
    $a = json_decode(file_get_contents("../data/small_item.json"),true);
    $plus_item_Sn = array_search($plus_item_S,$a);
    $sql = "update pluses set plus_audit_note='$plus_audit_note',plus_point_checked=$plus_point_checked,plus_item_S=$plus_item_Sn,plus_item_B=$plus_item_Bn,employee_timestamp=$Time ,plus_audit_employee='$username' where plus_id = $plus_id;";
    $res = mysqli_query($dbconn,$sql);
    if($res==1){
        $result['status']=1;
        $result['plus_audit_employee'] = getAuditName($username);
    }
    else {$result['status']=3;}
    echo json_encode($result);
}
mysqli_close($dbconn);
function error($errorcode){
    $result["status"] = $errorcode;
    echo json_encode($result);
    die();
}