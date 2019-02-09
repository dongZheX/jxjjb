<?php
/**
 * Created by PhpStorm.
 * User: dongZheX
 * Date: 2019/2/6
 * Time: 12:01
 */

function getConfig($param){
    $config_string = file_get_contents('../config/config.json');
// 用参数true把JSON字符串强制转成PHP数组
    $data = json_decode($config_string, true);
    return $data[$param];
}
function generateTable(){
    $result = array();
    $b_S = json_decode(file_get_contents("../data/big_item_small.json"),true);
    $count = 1;
    foreach($b_S as $b){
        foreach ($b as $s){
            $result[getBigItem($count)][getSmallItem($s)] = 0;
        }
        $count = $count + 1;
    }
    return $result;
}
function getBigItem($item){
    $data = json_decode(file_get_contents("../data/big_item.json"),true);
    return $data[$item];
}
function getSmallItem($item){
    $data = json_decode(file_get_contents("../data/small_item.json"),true);
    return $data[$item];
}
function getPlusState($item){
    if ($item==1){return "未审核";}
    elseif ($item==2){return "审核未通过";}
    elseif ($item==3){return "审核通过";}
    elseif ($item==4){return "已确认";}
}