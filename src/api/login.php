<?php
	

	session_start();
	function connect(){
		$servername = 'localhost:1234';
		$serverAccount = 'root';
		$serverPwd= 'root';
		$database = '1000phone';
		$conn = new mysqli($servername,$serverAccount,$serverPwd,$database);
		if ($conn->connect_error) {
			echo("数据连接失败");
			return null;
		}
		return $conn;
	}

	$username = !isset($_POST['username']) ? "" : $_POST['username'];
	$pwd = !isset($_POST['password']) ? "" : $_POST['password'];

	$sql = "select * from user where username = '$username' and password = '$pwd'";
	$db = connect();

	$dataset = array();

	if ($db) {
		$result = $db->query($sql);
		while ($row = $result->fetch_assoc()) {
			$dataset[] = $row;
		}
		$result->free();
		$db->close();
		if (count($dataset)>0) {
			$_SESSION['user'] = $username;
			echo "{status:true}";
		}else{
			echo "{status: false, message: 'username or password error'}";
		}
	}


?>