<?php
    function searchMv() {
        echo "Hello world!";
    }
    function searchSong() {
        global $conn; 
        $i=0;$notes;
        $result = mysqli_query($conn,"select * from song");
        while($song = mysqli_fetch_array($result,MYSQLI_ASSOC)){
            $note["id"]=$i+1;
            $note["song"]=urlencode($song['name']);  
            $note["src"]=$song['src'];

            $album=searchAlbum($song['album']);
            $note['album']= $album['name'];//专辑名

            $singer=searchSinger($album['singer']);
            $note['singer']= $singer['name'];//以专辑id为引搜寻歌手名
            $note['avatar']= $singer['avatar'];

            $notes[$i++]=$note; 
        }
        echo urldecode(json_encode($notes,JSON_UNESCAPED_SLASHES));
    }
    function searchAlbum($id){
        global $conn; 
        $result=mysqli_query($conn,"select * from album where id = '$id'");
        $rows=mysqli_fetch_array($result,MYSQLI_ASSOC);
        $arr['singer']=$rows['singer'];
        $arr['name']=urlencode($rows['name']);
        return $arr;
    }
    function searchSinger($id){
        global $conn; 
        $result=mysqli_query($conn,"select * from singer where id = '$id'");
        $rows=mysqli_fetch_array($result,MYSQLI_ASSOC);
        $arr['avatar']=$rows['avatar'];
        $arr['name']=urlencode($rows['name']);
        return $arr;
    }
?>