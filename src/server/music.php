<?php
include 'prepare.php';
include 'search.php';

//请求获取内容
@$req = $_POST["req"];
@$star = $_POST["star"];
// @$star = 0;
if (isset($req)) {
    switch ($req) {
        case 'checkLogin':checkLogin();
            break;
        case 'userInfo':getUserInfo();
            break;
        case 'page-favorite':
            if (!isset($_SESSION['user_id'])) {
                echo 'not login';
            } else {
                getFavortite($star);
            }
            break;

        case 'page-found':
            getFound();
            break;

        case 'page-mv':
            getMv();
            break;
    }
}

//执行动作
@$action = $_POST["action"];
// @$action='loginOut';
if (isset($action)) {
    switch ($action) {
        case 'loginOut':
            unset($_SESSION['user_id']);
            setcookie("user_id", "", time() - 3600);
            echo 'loginOut suc';
            break;
    }
}

mysqli_close($conn);
