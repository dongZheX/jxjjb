<?php
/**
 * Created by PhpStorm.
 * User: dongZheX
 * Date: 2019/2/7
 * Time: 22:40
 */
header("Content-type: text/html;charset=utf-8");
header("Cache-Control: no-cache");
if(isset($_REQUEST['action']))$action = $_REQUEST['action'];
if(isset($_REQUEST['content']))$content = $_REQUEST['content'];
if($action==1){
    $file = '../data/index_board.txt';
    $file = fopen($file,'w');
    fwrite($file,$content);
    fclose($file);

}
else{
    $files = '../data/index_board.txt';
    $cbody = file($files);
    for($i=0;$i<count($cbody);$i++) {
        echo $cbody[$i];
    }
}
