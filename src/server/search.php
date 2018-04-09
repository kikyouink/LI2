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
function getFound()
{
    global $conn;
    $i = 0;
    $result = mysqli_query($conn, "select * from playlist");
    while ($rows = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
        $playlist_item["id"] = $rows['id'];
        $playlist_item["name"] = $rows['name'];
        $playlist_item["picSrc"] = $rows['picSrc'];
        $playlist_item["count"] = $rows['count'];
        $playlist[$i++] = $playlist_item;

    }

    $j = 0;
    $result = mysqli_query($conn, "select * from flash");
    while ($rows = mysqli_fetch_array($result)) {
        $flash_item["id"] = $rows['id'];
        $flash_item["picSrc"] = $rows['picSrc'];
        $flash[$j++] = $flash_item;
    }
    $found["flash"] = $flash;
    $found["playlist"] = $playlist;

    echo json_encode($found, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
}
function getFavortite($star)
{
    global $conn;
    $i = 0;
    // $star = 0;
    $star = 10 * $star;
    $favorite;
    $user_id = $_SESSION['user_id'];
    $result = mysqli_query($conn, "select * from userinfo where user = '$user_id'");
    $rows = mysqli_fetch_array($result, MYSQLI_ASSOC);
    $userInfo_id = $rows["id"];
    $favorite_id = $userInfo_id;

    //判断是否越界
    $result = mysqli_query($conn, "select * from song where id in (select song from song_favorite where favorite='$favorite_id')");
    if (mysqli_num_rows($result) < $star) {
        echo 'no more';
        return;
    }
    $result = mysqli_query($conn, "select * from song where id in (select song from song_favorite where favorite='$favorite_id') limit $star,10");
    if (mysqli_num_rows($result) == 0) {
        echo 'empty';
        return;
    } else {
        while ($song = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
            $favorite_item["id"] = $song['id'];
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

}
function getMv()
{
    global $conn;
    $i = 0;
    $result = mysqli_query($conn, "select * from mv");
    while ($rows = mysqli_fetch_array($result, MYSQLI_ASSOC)) {

        $song = searchSong($rows['song']);

        $album = searchAlbum($song['album']);

        $singer = searchSinger($album['singer']);

        $mv_item['singer'] = $singer['name'];
        $mv_item['avatar'] = $singer['avatar'];
        $mv_item['song'] = $song['name'];
        $mv_item["src"] = $rows['src'];
        $mv_item["picSrc"] = $rows['picSrc'];
        $mv_item["count"] = $rows['count'];
        $mv[$i++] = $mv_item;
    }
    echo urldecode(json_encode($mv, JSON_UNESCAPED_SLASHES));
}
function getComment($song_id)
{
    global $conn;
    $i = 0;
    $result = mysqli_query($conn, "select * from comment where song = '$song_id'");
    if(mysqli_num_rows($result) == 0){
        echo 'no comment';
        return ;
    }
    while ($rows = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
        $user = searchUser($rows['user']);
        $cm_item['user'] = $user['nickname'];
        $cm_item['avatar'] = $user['avatar'];
        $cm_item['content'] = $rows['content'];
        $cm_item['time'] = $rows['time'];
        $comment[$i++] = $cm_item;
    }
    echo urldecode(json_encode( $comment, JSON_UNESCAPED_SLASHES));
}
function searchUser($id)
{
    global $conn;
    $result = mysqli_query($conn, "select * from userinfo where user = '$id'");
    $rows = mysqli_fetch_array($result, MYSQLI_ASSOC);
    $arr['avatar'] = $rows['avatar'];
    $arr['nickname'] = urlencode($rows['nickname']);
    return $arr;
}
function searchSong($id)
{
    global $conn;
    $result = mysqli_query($conn, "select * from song where id = '$id'");
    $rows = mysqli_fetch_array($result, MYSQLI_ASSOC);
    $arr['id'] = $rows['id'];
    $arr['album'] = $rows['album'];
    $arr['name'] = urlencode($rows['name']);
    return $arr;
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
