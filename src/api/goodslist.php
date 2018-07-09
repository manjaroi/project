<?php 
    include "dbhelper.php";
    $order = isset($_GET["order"]) ? $_GET["order"] : '';
    $page = isset($_GET['page']) ? $_GET['page'] : 1;
    $qty = isset($_GET['qty']) ? $_GET['qty'] : 12;

    $sql = "select * from bra";

        

    if ($order == 'a') {   
        # code...
        $b = "select * from bra ORDER BY price ASC";
        $c  =   query_sql($b);
        $lists = json_encode($c);
        // echo "{status: true, data: $lists}";
        $res = array(
            "total" => $lists,
            "data" => array_slice(json_decode($lists),$qty*($page-1),$qty),
            "qty" => $qty*1,
            "page" => $page*1
        );
        echo json_encode($res,JSON_UNESCAPED_UNICODE);
    }
    else if ($order == 'q') {
        $w = "select * from bra ORDER BY price DESC";
        $v  =   query_sql($w);
        $lists = json_encode($v);
        $res = array(
            "total" => $lists,
            "data" => array_slice(json_decode($lists),$qty*($page-1),$qty),
            "qty" => $qty*1,
            "page" => $page*1
        );
        echo json_encode($res,JSON_UNESCAPED_UNICODE);
    }
    else if ($order == 'm') {
        # code...
        $w = "select * from bra ORDER BY date DESC";
        $v  =   query_sql($w);
        $lists = json_encode($v);
        // echo "{status: true, data: $lists}";
        $res = array(
            "total" => $lists,
            "data" => array_slice(json_decode($lists),$qty*($page-1),$qty),
            "qty" => $qty*1,
            "page" => $page*1
        );
        echo json_encode($res,JSON_UNESCAPED_UNICODE);

    }
    else{

        $result = query_sql($sql);
        $lists = json_encode($result);
        // echo $lists;
        // $result = $conn->query($sql);
        // $row = $result->fetch_all(MYSQLI_ASSOC);


        // // // 格式化数据
        $res = array(
            "total" => $lists,
            "data" => array_slice(json_decode($lists),$qty*($page-1),$qty),
            "qty" => $qty*1,
            "page" => $page*1
        );

        echo json_encode($res,JSON_UNESCAPED_UNICODE);

            // echo "{status: true, data: $lists}";
        };

    // echo "{status: true, data: $lists}";

    

?>  