<?php
/**
 * Created by PhpStorm.
 * User: dongZheX
 * Date: 2019/2/9
 * Time: 15:04
 */
function getClassName($class_id){
    $host =  getConfig("sqlHost");
    $psw = getConfig("sql_psw");
    $username = getConfig("sql_username");
    $dbname = getConfig("dbname");
    $dbconn = mysqli_connect($host,$username,$psw,$dbname);
    $sql = "select class_name from classes where class_id=$class_id;";
    $result = mysqli_query($dbconn,$sql);
    $result = mysqli_fetch_assoc($result);
    return $result['class_name'];
}
