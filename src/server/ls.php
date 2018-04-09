<?php
//连接数据库
include 'mysql.php';

@$name = $_POST['username'];
@$words = $_POST['password'];
@$type = $_POST['type'];
//登录
if ($type == 'login') {
    $result = mysqli_query($conn, "select * from user where name = '$name' ");
    $row = mysqli_fetch_array($result);
    if (mysqli_num_rows($result) == 0) {
        echo 'user not exsits';
    } else {
        if ($words == $row['password']) {
            setcookie("user_id", $row['id'], time()+24*3600*7);
			$_SESSION['user_id'] = $row['id'];
			echo 'login succeed';
        } else {
            echo 'password error';
        }

    }
}
//注册
else {
    //查询用户名是否存在
    $result = mysqli_query($conn, "select * from user where name = '$name'");
    $row = mysqli_fetch_array($result);
    if (mysqli_num_rows($result) > 0) {
        echo 'user exsits';
    } else {
        $insert = "insert into user (name, password)
			VALUES ('$name', '$words')";

        if (mysqli_query($conn, $insert)) {
            echo "sign succeed";
            $user_id = mysqli_insert_id($conn);
            setcookie("user_id", $user_id, time()+24*3600*7);
            $_SESSION['user_id'] = $user_id;

            //初始化用户信息
            $insert = "insert into userinfo (nickname,avatar,sign,user)
			VALUES ('音乐fans','http://img.zcool.cn/community/01786557e4a6fa0000018c1bf080ca.png@1280w_1l_2o_100sh.webp','你好，世界！', '$user_id')";
			mysqli_query($conn, $insert);

        } else {
            echo "Error: " . $insert . "<br>" . mysqli_error($conn);
        }
    }
}
mysqli_close($conn);
