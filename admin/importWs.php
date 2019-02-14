<?php
/**
 * Created by PhpStorm.
 * User: dongZheX
 * Date: 2019/2/13
 * Time: 22:10
 */
//班级用户导入 数据库直接导入。
header("Content-type: json/html;charset=utf-8");
date_default_timezone_set('PRC');
session_start();
$audit = $_SESSION['username'];
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
$a = json_decode(file_get_contents("../data/major_id.json"),true);
$Time = time();
if($action==1){
    if(!empty($_FILES["commit_file_w"]["error"]))error(11);
    else{
        $file = $_FILES['commit_file_w']['type'];
        if($_FILES['commit_file_w']['type']!="application/vnd.ms-excel")error(32);
        else{
            $time = time();
            move_uploaded_file($_FILES["commit_file_w"]["tmp_name"],"../MaterialData/ws/$time.xls");
            $data = importExecl("../MaterialData/ws/$time.xls");
            $count = 0;
            foreach ($data as $subdata){
                if ($subdata['A']=="年级")continue;
                if ($subdata['A']=="")break;
                $score = $subdata['D'];
                $key ="宿舍优秀率：$score";
                if ($score<0.2)continue;elseif ($score<0.3&&$score>0.2)$score=5;else $score=10;
                $select_y=$subdata['A'];$select_m=$subdata['B'];$select_m = array_search($select_m,$a);
                $select_class = $subdata['C'];
                $class_id = "$select_y$select_m$select_class";
                $sql = "insert into pluses(class_id,plus_item_B,plus_item_S,plus_point_submitted,plus_point_checked,plus_keywords,plus_Certificate,plus_audit_note,class_timestamp,employee_timestamp,plus_state,plus_audit_employee) values".
                    "('$class_id','9','35',$score,$score,'$key','MaterialData/ws/$time.xls','无',$Time,$Time,'4','$audit');";
                $res = mysqli_query($dbconn,$sql);
                if ($res){
                    $result['status']=1;
                }
                else {$dbconn->rollback();error(44);}

            }
            $dbconn->commit();
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