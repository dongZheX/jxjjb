<?php
/**
 * Created by PhpStorm.
 * User: 叶珂
 * Date: 2019/2/12
 * Time: 18:37
 */
header("Content-type: json/html;charset=utf-8");
date_default_timezone_set('PRC');
//查询类型
$type = 0;//0:查询月度 1:查询学期 2:查询学年
$isTop = 0;//0:不封顶 1:封顶
//获取数据
$select_y = isset($_REQUEST['select_Y'])?trim($_REQUEST['select_Y']):date('Y');
$select_m = isset($_REQUEST['select_M'])?trim($_REQUEST['select_M']):date('m');
$select_grade = isset($_REQUEST['select_G'])?trim($_REQUEST['select_G']):"";
$select_top = isset($_REQUEST['select_T'])?trim($_REQUEST['select_T']):"是";
//处理获取到的数据
    //年份
if(strlen($select_y) < 10) {
    $type = 2;//查询学年
    $select_y = substr($select_y,0,4);//获取具体学年
}
else {
    $num = substr($select_y, 10, 1);//获取具体学期
    //月份
    if ($select_m == "请选择") {
        $type = 1;//查询学期
        $select_y = substr($select_y,0,4);//获取具体学年
    }
    else {
        $type = 0;//查询月度
        if($select_m == "1" or $select_m == "2" or $select_m == "3" or $select_m == "4")
            $select_y = substr($select_y,5,4);//破折号后的年份
        else $select_y = substr($select_y,0,4);//破折号前的年份
    }
}
    //是否封顶
if($select_top == "是") $isTop = 1;

    //年级
if ($select_grade == "请选择") $select_grade = "";//查询所有年级
//数据库初始化
include("util.php");
include("alawaysSQL.php");
$host =  getConfig("sqlHost");
$psw = getConfig("sql_psw");
$username = getConfig("sql_username");
$dbname = getConfig("dbname");
$dbconn = mysqli_connect($host,$username,$psw,$dbname);
$result = array();

//查询班级
$select_class_sql = "SELECT class_id FROM classes WHERE class_id LIKE '".$select_grade."%'";
$classes = mysqli_query($dbconn, $select_class_sql);
//初始化数组
while ($class = mysqli_fetch_assoc($classes)){
    $id = $class['class_id'];
    $result["$id"] = array(
        "class_id" => $id,
        "1" => 0,
        "2" => 0,
        "3" => 0,
        "4" => 0,
        "5" => 0,
        "6" => 0,
        "7" => 0,
        "8" => 0,
        "9" => 0,
        "10" => 0,
        "11" => 0,
        "12" => 0,
        "13" => 0,
        "14" => 0,
        "15" => 0,
        "16" => 0,
        "17" => 0,
        "18" => 0,
        "19" => 0,
        "20" => 0,
        "21" => 0,
        "22" => 0,
        "23" => 0,
        "24" => 0,
        "25" => 0,
        "26" => 0,
        "27" => 0,
        "28" => 0,
        "29" => 0,
        "30" => 0,
        "31" => 0,
        "32" => 0,
        "33" => 0,
        "34" => 0,
        "35" => 0,
        "36" => 0,
        "37" => 0,
        "38" => 0,
        "39" => 0,
        "total" => 0,
    );
}
$likegrade = $select_grade.'%';
//获取全部数据
switch ($type){
    case 0:$sql = "call select_grade_month_detail ($select_y, $select_m, '$likegrade')";break;
    case 1:$sql = "CALL select_grade_term_detail($select_y, $num, '$likegrade')";break;
    case 2:$sql = "CALL select_grade_year_detail($select_y, '$likegrade')";break;
}
$res = mysqli_query($dbconn, $sql);
if(mysqli_num_rows($res) < 1) {
    echo 0;
    die();
}
else{
    //将数据放入数组的对应位置
    while ($line = mysqli_fetch_assoc($res)){
        $class_id = $line['class_id'];
        $plus_item_S = $line['plus_item_S'];
        $plus_point_checked = $line['plus_point_checked'];
        $result[$class_id][$plus_item_S] += $plus_point_checked;
    }
//处理数组
    $return = array();
    foreach ($result as $value){
        $value['class_id'] = getClassName($value['class_id']);
        $total = 0;
        $num = count($value);
        foreach ($value as $key => $score) {
            //封顶(该部分有待优化)
            //是否封顶=1 查询类型=学期或学年 该小项需要封顶
            if($isTop == 1 && ($type == 1 or $type = 2) && getCap($key) != 0 ) {
                //年度封顶 需要合并科技创新一栏的单元格
                if($type == 2 && ($key == 19 || $key == 20 || $key == 21 || $key == 22 )){
                    $value[18] += $value[$key];//将总分并到第一个小项
                    $value[$key] = 0;//自身清零
                    //额外检查合并后第一个小项是否需要封顶
                    if($value[18] > getCap(18)) $value[18] = getCap(18);
                }
                //封顶
                if($score > getCap($key)) {
                    $value[$key] = getCap($key);
                }
            }
        }
        //算总分需要再遍历一次(额外的时间消耗)
        foreach ($value as $key => $score){
            if($key != "class_id")
                $total += $value[$key];
        }
        $value['total'] = $total;
        $return[] =  $value;
    }
    echo json_encode($return);
}


