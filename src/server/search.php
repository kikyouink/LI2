<?php
function searchMv()
{
    echo "Hello world!";
}
function checkLogin()
{
    global $conn;
    if (isset($_COOKIE['user_id'])) {
        $_SESSION['user_id'] = $_COOKIE['user_id'];
        echo 1;
    } else {
        echo 0;
    }

}
function getUserInfo()
{
    global $conn;
    $user_id = $_SESSION['user_id'];
    $result = mysqli_query($conn, "select * from userInfo where user = '$user_id'");
    $rows = mysqli_fetch_array($result, MYSQLI_ASSOC);
    echo json_encode($rows, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
}
// function getFound(){
//     global $conn;
//     $i = 0;
//     $found;

//     // $result = mysqli_query($conn, "select * from favorite where userInfo = '$userInfo_id'");
//     // //判断用户是否已有歌单
//     // if ($result) {
//     //     $rows = mysqli_fetch_array($result, MYSQLI_ASSOC);
//     //     $favorite_id = $rows['id'];
//     // } else {
//     //     $insert = "insert into favorite (userInfo,time)
//     //     VALUES ('$userInfo_id',date)";
//     //     mysqli_query($conn, $insert);
//     //     $favorite_id = mysqli_insert_id($conn);
//     // }

//     $result = mysqli_query($conn, "select id from playlist");
//     while ($song = mysqli_fetch_array($result, MYSQLI_ASSOC)){

//     }

//     //得到关系表中歌曲的id之后
//     $result = mysqli_query($conn, "select * from song where id in (select song from song_playlist where playlist='$playlist_id')");
//     if(!$result){
//         echo '歌单暂无歌曲';
//         return ;
//     }
//     while ($song = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
//         $playlist_item["id"] = $i + 1;
//         $playlist_item["time"] = $rows['time'];
//         $playlist_item["song"] = urlencode($song['name']);
//         $playlist_item["src"] = $song['src'];

//         $album = searchAlbum($song['album']);
//         $playlist_item['album'] = $album['name']; //专辑名

//         $singer = searchSinger($album['singer']);
//         $playlist_item['singer'] = $singer['name']; //以专辑id为引搜寻歌手名
//         $playlist_item['avatar'] = $singer['avatar'];

//         $playlist[$i++] = $playlist_item;
//     }
//     echo urldecode(json_encode($playlist, JSON_UNESCAPED_SLASHES));
// }
function getFavortite()
{
    global $conn;
    $i = 0;
    if (!isset($_SESSION['star'])) {
        $_SESSION['star'] = 0;
    }

    $star = $_SESSION['star'];
    $favorite;
    $user_id = $_SESSION['user_id'];
    $result = mysqli_query($conn, "select * from userinfo where user = '$user_id'");
    $rows = mysqli_fetch_array($result, MYSQLI_ASSOC);
    $userInfo_id = $rows["id"];
    $favorite_id = $userInfo_id;

    //得到关系表中歌曲的id之后
    $result = mysqli_query($conn, "select * from song where id in (select song from song_favorite where favorite='$favorite_id') limit 0,10");
    // limit '$star',5"
    if (!$result) {
        echo '已加载所有歌曲';
        unset($_SESSION['star']);
        return;
    } else {
        while ($song = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
            $favorite_item["id"] = $i + 1;
            $favorite_item["time"] = $rows['time'];
            $favorite_item["song"] = urlencode($song['name']);
            $favorite_item["src"] = $song['src'];

            $album = searchAlbum($song['album']);
            $favorite_item['album'] = $album['name']; //专辑名

            $singer = searchSinger($album['singer']);
            $favorite_item['singer'] = $singer['name']; //以专辑id为引搜寻歌手名
            $favorite_item['avatar'] = $singer['avatar'];

            $favorite[$i++] = $favorite_item;
        }
        $_SESSION['star'] += 5;
        echo urldecode(json_encode($favorite, JSON_UNESCAPED_SLASHES));
    }

}
function getMv()
{

}
function searchAlbum($id)
{
    global $conn;
    $result = mysqli_query($conn, "select * from album where id = '$id'");
    $rows = mysqli_fetch_array($result, MYSQLI_ASSOC);
    $arr['singer'] = $rows['singer'];
    $arr['name'] = urlencode($rows['name']);
    return $arr;
}
function searchSinger($id)
{
    global $conn;
    $result = mysqli_query($conn, "select * from singer where id = '$id'");
    $rows = mysqli_fetch_array($result, MYSQLI_ASSOC);
    $arr['avatar'] = $rows['avatar'];
    $arr['name'] = urlencode($rows['name']);
    return $arr;
}
