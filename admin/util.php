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