<?php
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Methods:POST,GET');
header('Access-Control-Allow-Headers:x-requested-with,content-type');
header("Content-Type:text/html; charset=utf-8");

session_start();

$servername = "localhost:3306";
$username = "root";
$password = "123456";
$dbname = "music";
// 创建连接
global $conn;
$conn = mysqli_connect($servername, $username, $password, $dbname);

// 检测连接
if (!$conn) {
    die("连接失败: " . mysqli_connect_error());
}
