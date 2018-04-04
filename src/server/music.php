<?php
include 'prepare.php';
include 'search.php';

//请求获取内容
@$req = $_POST["req"];
@$step = $_POST["step"];
// @$req='userInfo';
if (isset($req)) {
    switch ($req) {
        case 'userInfo':getUserInfo();
            break;
        case 'page-favorite':
            if (!isset($_SESSION['user_id'])) {
                echo 'not login';
            } else {
                getFavortite($step);
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
            echo 'loginOut suc';
            break;
    }
}

mysqli_close($conn);
