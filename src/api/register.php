<?php
	
	include 'dbhelper.php';

	$username = !isset($_POST["username"]) ? "" : $_POST["username"];
    $pwd = !isset($_POST["password1"]) ? "" : $_POST["password1"];


	$sql = "select * from user where username = '$username'"; 
	$result = query_sql($sql);
	$lists = json_encode($result);
	if(count($result)>0){
		 echo "{status: false, message: '用户名已注册'}";
	}else{
		$sql = "insert into user(username, password) values('$username', '$pwd')";
		$result = exec_sql($sql);
		if ($result) {
			echo "{status:true}";
		}else{
		 	echo "{status: false, message: 'username or password error'}";
		}
	}



?>