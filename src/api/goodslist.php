<?php 
    include "dbhelper.php";
    $order = isset($_GET["order"]) ? $_GET["order"] : '';

    $sql = "select * from bra";

    if ($order == 'a') {
    	# code...
    	$b = "select * from bra ORDER BY price ASC";
    	$c	=	query_sql($b);
    	$lists = json_encode($c);
    	echo "{status: true, data: $lists}";
    }
    else if ($order == 'q') {
    	$w = "select * from bra ORDER BY price DESC";
    	$v	=	query_sql($w);
    	$lists = json_encode($v);
    	echo "{status: true, data: $lists}";
    }
    else if ($order == 'm') {
    	# code...
    	$w = "select * from bra ORDER BY date DESC";
    	$v	=	query_sql($w);
    	$lists = json_encode($v);
    	echo "{status: true, data: $lists}";
    }
    else{

	    $result = query_sql($sql);

	    $lists = json_encode($result);

	    echo "{status: true, data: $lists}";
    };

    
    

    
?>