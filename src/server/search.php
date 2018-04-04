<?php
function searchMv()
{
    echo "Hello world!";
}
function getUserInfo()
{
    global $conn;
    $user_id = $_SESSION['user_id'];
    $result = mysqli_query($conn, "select * from userInfo where user = '$user_id'");
    $rows = mysqli_fetch_array($result, MYSQLI_ASSOC);
    echo json_encode($rows, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
}
function getFound(){
    global $conn;
    $i = 0;
    $found;

    // $result = mysqli_query($conn, "select * from favorite where userInfo = '$userInfo_id'");
    // //判断用户是否已有歌单
    // if ($result) {
    //     $rows = mysqli_fetch_array($result, MYSQLI_ASSOC);
    //     $favorite_id = $rows['id'];
    // } else {
    //     $insert = "insert into favorite (userInfo,time)
    //     VALUES ('$userInfo_id',date)";
    //     mysqli_query($conn, $insert);
    //     $favorite_id = mysqli_insert_id($conn);
    // }

    $result = mysqli_query($conn, "select * from favorite where userInfo = '$userInfo_id'");
    
    

    //得到关系表中歌曲的id之后
    $result = mysqli_query($conn, "select * from song where id in (select song from song_favorite where favorite='$favorite_id')");
    if(!$result){
        echo '歌单暂无歌曲';
        return ;
    }
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
    echo urldecode(json_encode($favorite, JSON_UNESCAPED_SLASHES));
}
function getFavortite()
{
    global $conn;
    $i = 0;
    $favorite;
    $user_id = $_SESSION['user_id'];
    $result = mysqli_query($conn, "select * from userinfo where user = '$user_id'");
    $rows = mysqli_fetch_array($result, MYSQLI_ASSOC);
    $userInfo_id = $rows["id"];

    $result = mysqli_query($conn, "select * from favorite where userInfo = '$userInfo_id'");
    //判断用户是否已有歌单
    if ($result) {
        $rows = mysqli_fetch_array($result, MYSQLI_ASSOC);
        $favorite_id = $rows['id'];
    } else {
        $insert = "insert into favorite (userInfo,time)
        VALUES ('$userInfo_id',date)";
        mysqli_query($conn, $insert);
        $favorite_id = mysqli_insert_id($conn);
    }

    //得到关系表中歌曲的id之后
    $result = mysqli_query($conn, "select * from song where id in (select song_favorite.song from song_favorite where favorite='$favorite_id')");
    if(!$result){
        echo '歌单暂无歌曲';
        return ;
    }
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
    echo urldecode(json_encode($favorite, JSON_UNESCAPED_SLASHES));
}
function getMv(){

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
