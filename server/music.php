<?php
	//连接数据库
	include 'mysql.php';

	$create = "create table if not exists singer (
		id int(6) unsigned auto_increment primary key, 
		name varchar(30) not null,
		avatar varchar(100) not null
	)";
	mysqli_query($conn, $create) or die(mysqli_error($conn));
	$create = "create table if not exists song (
		id int(6) unsigned auto_increment primary key, 
		name varchar(30) not null,
		singer int(6) unsigned not null,
		src varchar(100) not null,
		foreign key(singer) references singer(id)
	)";
	mysqli_query($conn, $create) or die(mysqli_error($conn));

	$create = "create table if not exists comment (
		id int(6) unsigned auto_increment primary key, 
		content varchar(100) not null,
		time timestamp,
		user int(6) unsigned not null,
		song int(6) unsigned not null,
		foreign key(user) references user(id),
		foreign key(user) references user(id)
	)";
	mysqli_query($conn, $create) or die(mysqli_error($conn));


	
	// @$name=$_POST['username'];
	// @$words=$_POST['password'];
	// @$type=$_POST['type'];
	// //登录
	// if($type=='login'){
	// 	$result = mysqli_query($conn,"select * from user where name = '$name' ");
	// 	$row = mysqli_fetch_array($result);
	// 	if(mysqli_num_rows($result) == 0){
	// 		echo 'user not exsits';
	// 	}
	// 	else{
	// 		if($words==$row['password']){
	// 			$_SESSION['user']=$name;
	// 			echo 'login succeed';
	// 		}
	// 		else echo 'password error';
	// 	}
	// }
	// //注册
	// else{
	// 	$create = "create table if not exists user (
	// 		id int(6) unsigned auto_increment primary key, 
	// 		name varchar(30) not null,
	// 		song_num int(6) not null,
	// 		album_num int(6) not null,
	// 		mv_num int(6) not null,
	// 	)";

	// 	if (mysqli_query($conn, $create)) {
	// 		// echo "数据表 user 创建成功";
	// 	} 
	// 	// else {
	// 	//     echo "创建数据表错误: " . mysqli_error($conn);
	// 	// }
	// 	@$name=$_POST['username'];
	// 	@$words=$_POST['password'];
	// 	//查询用户名是否存在
	// 	$result = mysqli_query($conn,"select * from user where name = '$name'");
	// 	$row = mysqli_fetch_array($result);
	// 	if(mysqli_num_rows($result) > 0){
	// 		echo 'user exsits';
	// 	}
	// 	else{
	// 		$insert = "insert into user (name, password)
	// 		VALUES ('$name', '$words')";
		
	// 		if (mysqli_query($conn, $insert)) {
	// 			echo "sign succeed";
	// 		} else {
	// 			echo "Error: " . $insert . "<br>" . mysqli_error($conn);
	// 		}
	// 	}
	// }
    mysqli_close($conn); 
?>