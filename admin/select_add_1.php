<?php
/**
 * Created by PhpStorm.
 * User: dongZheX
 * Date: 2019/2/12
 * Time: 15:44
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
if(isset($_REQUEST['action']))$action = $_REQUEST['action'];else error(20);
if($action==1){
    if(isset($_REQUEST['select_y']))$select_y = $_REQUEST['select_y'];else error(21);
    if(isset($_REQUEST['select_m']))$select_m = $_REQUEST['select_m'];else error(22);
    $a = json_decode(file_get_contents("../data/major_id.json"),true);
    $select_m = array_search($select_m,$a);
    if(isset($_REQUEST['select_class']))$select_class = $_REQUEST['select_class'];else error(23);
    if(isset($_REQUEST['select_state']))$select_state = $_REQUEST['select_state'];else error(24);
    if(isset($_REQUEST['select_year']))$select_year = $_REQUEST['select_year'];else error(25);
    if(isset($_REQUEST['select_mon']))$select_mon = $_REQUEST['select_mon'];else error(26);
    if(isset($_REQUEST['select_key']))$select_key = $_REQUEST['select_key'];else error(27);
    if(isset($_REQUEST['select_item_b']))$select_item_b = $_REQUEST['select_item_b'];else error(28);
    if(isset($_REQUEST['offset']))$offset = $_REQUEST['offset'];else error(29);
    if(isset($_REQUEST['size']))$size= $_REQUEST['size'];else error(30);
    $offset = ($offset-1)*$size;
    $class_id = "________";
    $add1 = "";$add3="";
    if ($select_y!="全部")$class_id="$select_y"."____";
    if ($select_m!="0")$class_id=substr($class_id,0,4).$select_m."__";
    if($select_class!="全部")$class_id=substr($class_id,0,6).$select_class;
    if ($select_state!=0)$add1 = " and plus_state = $select_state";
    if ($select_key!="")$add2 = "class_id like '$class_id' and plus_keywords like '%$select_key%' ";else $add2="class_id like '$class_id'";
    if($select_item_b!=0)$add3 = " and plus_item_B = $select_item_b";
    $total_sql = "SELECT COUNT(*) FROM pluses WHERE $add2
    AND YEAR(FROM_UNIXTIME(class_timestamp)) = $select_year
    AND MONTH(FROM_UNIXTIME(class_timestamp)) = $select_mon$add1$add3;";
    $total = mysqli_fetch_array(mysqli_query($dbconn,$total_sql))[0];
    $sql = "SELECT * FROM pluses WHERE $add2
    AND YEAR(FROM_UNIXTIME(class_timestamp)) = $select_year
    AND MONTH(FROM_UNIXTIME(class_timestamp)) = $select_mon$add1$add3 limit $offset,$size;";
    $data = array();
    $res = mysqli_query($dbconn,$sql);
    while ($row=mysqli_fetch_assoc($res)){
        $row['plus_state'] = getPlusState($row['plus_state']);
        $row['plus_item_B'] = getBigItem($row['plus_item_B']);
        $row['class_id'] = getClassName($row['class_id']);
        if ($row['plus_item_S'])$row['plus_item_S'] = getSmallItem($row['plus_item_S']);
        if ($row['plus_audit_employee'])$row['plus_audit_employee'] = getAuditName($row['plus_audit_employee']);
        $row=array_filter($row,create_function('$v','return !empty($v);'));
        $data[] = $row;
    }
    $result['total'] = $total;
    $result['rows'] = $data;
    echo json_encode($result);
}
function error($errorcode){
    $result["status"] = $errorcode;
    echo json_encode($result);
    die();
}