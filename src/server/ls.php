<?php
	//连接数据库
	include 'mysql.php';
	
	@$name=$_POST['username'];
	@$words=$_POST['password'];
	@$type=$_POST['type'];
	//登录
	if($type=='login'){
		$result = mysqli_query($conn,"select * from user where name = '$name' ");
		$row = mysqli_fetch_array($result);
		if(mysqli_num_rows($result) == 0){
			echo 'user not exsits';
		}
		else{
			if($words==$row['password']){
				$_SESSION['user']=$name;
				echo 'login succeed';
			}
			else echo 'password error';
		}
	}
	//注册
	else{
		//查询用户名是否存在
		$result = mysqli_query($conn,"select * from user where name = '$name'");
		$row = mysqli_fetch_array($result);
		if(mysqli_num_rows($result) > 0){
			echo 'user exsits';
		}
		else{
			$insert = "insert into user (name, password)
			VALUES ('$name', '$words')";
		
			if (mysqli_query($conn, $insert)) {
				echo "sign succeed";
			} else {
				echo "Error: " . $insert . "<br>" . mysqli_error($conn);
			}
		}
	}
    mysqli_close($conn); 
?>