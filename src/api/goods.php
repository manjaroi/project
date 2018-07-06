<?php 
    include "dbhelper.php";
    
    $sql = "select * from goods";

    $result = query_sql($sql);

    $lists = json_encode($result);

    echo "{status: true, data: $lists}";
?>