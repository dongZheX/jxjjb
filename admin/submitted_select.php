<?php
/**
 * Created by PhpStorm.
 * User: dongZheX
 * Date: 2019/2/11
 * Time: 11:46
 * 未采用服务器分页方式 后期更改 加入limit 和offset 加入之后 返回相应数据就可以了
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
$date = $BeginDate = date('Ym', strtotime(date("Ym")));
$name = date('YmdHis', strtotime(date("YmdHis")));
$Time = time();
if($action==1){
    //name
    if(isset($_REQUEST['select_y']))$select_y = $_REQUEST['select_y'];else error(20);
    if(isset($_REQUEST['select_m']))$select_m = $_REQUEST['select_m'];else error(21);
    $a = json_decode(file_get_contents("../data/major_id.json"),true);
    $select_m = array_search($select_m,$a);
    if(isset($_REQUEST['select_class']))$select_class = $_REQUEST['select_class'];else error(21);
    $month = date("m",time());
    $year = date("Y",time());
    $class_id = "$select_y$select_m$select_class";
    $sql = "call select_class_month_detail('$year','$month','$class_id');";
    $res = mysqli_query($dbconn,$sql);
    $count = 0;
    //important
    while ($row = mysqli_fetch_assoc($res)){
        $row['plus_state'] = getPlusState($row['plus_state']);
        $row['plus_item_B'] = getBigItem($row['plus_item_B']);
        $row['plus_audit_employee'] = getAuditName($row['plus_audit_employee']);
        $row=array_filter($row,create_function('$v','return !empty($v);'));
        $result[$count++] = $row;
    }
    echo json_encode($result);
}
function error($errorcode){
    $result["status"] = $errorcode;
    echo json_encode($result);
    die();
}
