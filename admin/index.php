<?php
/**
 * Created by PhpStorm.
 * User: dongZheX
 * Date: 2019/2/7
 * Time: 14:37
 */
header("Content-type: text/json;charset=utf-8");
header("Cache-Control: no-cache");
session_start();
$username = $_SESSION["username"];
echo "{\"name\":$username}";