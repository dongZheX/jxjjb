<?php
/**
 * Created by PhpStorm.
 * User: dongZheX
 * Date: 2019/2/14
 * Time: 21:56
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
$audit = $_SESSION['username'];
$result = array();
//读取动作
if(isset($_REQUEST['action']))$action = $_REQUEST['action'];else error(20);
if(isset($_SESSION['username']))$class_id = $_SESSION['username'];else error(5);
$date = $BeginDate = date('Ym', strtotime(date("Ym")));
$name = date('YmdHis', strtotime(date("YmdHis")));
$Time = time();
if ($action==1){
    if(isset($_REQUEST['rule_name']))$rule_name = $_REQUEST['rule_name'];else error(21);
    if(isset($_REQUEST['rule_item']))$rule_item = $_REQUEST['rule_item'];else error(22);
    if(isset($_REQUEST['rule_y']))$rule_y = $_REQUEST['rule_y'];else error(24);
    if(isset($_REQUEST['rule_m']))$rule_m = $_REQUEST['rule_m'];else error(25);
    if(isset($_REQUEST['rule_class']))$rule_class= $_REQUEST['rule_class'];else error(26);
    if(isset($_REQUEST['rule_score']))$rule_score= $_REQUEST['rule_score'];else error(26);
    //这个可以用index替换以后再说
    $a = json_decode(file_get_contents("../data/small_item.json"),true);
    $rule_item = array_search($rule_item,$a);
    $b = json_decode(file_get_contents("../data/major_id.json"),true);
    $rule_m = array_search($rule_m,$b);
    $class_id = "$rule_y$rule_m$rule_class";
    $rule_score = abs($rule_score)*(-1);
    //处理文件
    if ($_FILES["rule_file"]["error"] > 0)
    {
        error(4);
    }
    $rootdir = "../MaterialData/$date";
    if (!file_exists($rootdir))mkdir($rootdir);
    $classdir = "../MaterialData/$date/$date$class_id";
    if (!file_exists($classdir))mkdir($classdir);
    $typewf = $_FILES["rule_file"]["type"];
    $back = substr(strrchr($_FILES["rule_file"]["name"], '.'), 1);
    $name = $name.".".$back;
    move_uploaded_file($_FILES["rule_file"]["tmp_name"],
        "$classdir/$name");
    $insertdir = "MaterialData/$date/$date$class_id/$name";
    //处理其他数据
    $sql = "insert into pluses(class_id,plus_item_B,plus_item_S,plus_point_submitted,plus_point_checked,plus_keywords,plus_Certificate,plus_audit_note,class_timestamp,employee_timestamp,plus_state,plus_audit_employee) values".
        "('$class_id','4',$rule_item,$rule_score,$rule_score,'纪律扣分','$insertdir','$rule_name',$Time,$Time,'4','$audit');";
    $res = mysqli_query($dbconn,$sql);
    if ($res)
        $result['status']=1;
    else
        $result['status']=0;
    echo json_encode($result);
}
function error($errorcode){
    $result["status"] = $errorcode;
    echo json_encode($result);
    die();
}