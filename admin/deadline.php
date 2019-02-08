<?php
/**
 * Created by PhpStorm.
 * User: dongZheX
 * Date: 2019/2/8
 * Time: 11:18
 */
header("Content-type: json/html;charset=utf-8");
header("Cache-Control: no-cache");
date_default_timezone_set('PRC');
if(isset($_REQUEST['action']))$action = $_REQUEST['action'];else error(2);
//action = 1 读取时间
$result = array();
$start = $BeginDate = date('Y-m-01', strtotime(date("Y-m-d")));
$end = date('Y-m-d', strtotime("$BeginDate +1 month -1 day"));
//获取时间
$json_string = file_get_contents('../config/deadline.json');
// 用参数true把JSON字符串强制转成PHP数组
$data = json_decode($json_string, true);
if ($action==1){
    if($data['start']==0){
        $result['start'] = strtotime($start);
    }else{
        //检测是否合法
        if($data['start']<$start or $data['start']>$end){
            $result['start'] = strtotime($start);
            $data['start'] = 0;
        }
        else{
            $result['start'] = strtotime($data['start']);
        }
    }
    if($data['end']==0){
        $result['end'] = strtotime($end);
    }else{
        //检测是否合法
        if($data['end']<$start or $data['end']>$end){
            $result['end'] = strtotime($end);
            $data['end'] = 0;
        }
        else{
            $result['end'] =  strtotime($data['end']);
        }
    }
    $result["status"] = 1;
    file_put_contents('../config/deadline.json',json_encode($data));
    echo json_encode($result);
}
elseif($action==2){
    if(isset($_REQUEST['start']))$s = $_REQUEST['start'];else  error(2);
    if(isset($_REQUEST['end']))$e = $_REQUEST['end'];else  error(2);
    //截止日期合法性前端检验
    $data['start'] = $s;
    $data['end'] = $e;
    $result["status"] = 1;
    file_put_contents('../config/deadline.json',json_encode($data));
}
/*
 * 错误
 */
function error($errorcode){
    $result["status"] = $errorcode;
    echo json_encode($result);
    die();
}
