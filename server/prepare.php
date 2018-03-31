<?php
    //连接数据库
	include 'mysql.php';

    //创建歌手表
    $createSinger = "create table if not exists singer (
        id int(6) unsigned auto_increment primary key, 
        name varchar(30) not null,
        avatar varchar(100) not null,
        album_num int(6),
        song_num int(6),
        mv_num int(6)
    )";
    mysqli_query($conn, $createSinger) or die(mysqli_error($conn)); 

    //创建专辑表
    $createAlbum = "create table if not exists album (
        id int(6) unsigned auto_increment primary key, 
        name varchar(30) not null,
        singer int(6) unsigned not null,
        foreign key(singer) references singer(id)
    )";
    mysqli_query($conn, $createAlbum) or die(mysqli_error($conn));

    //创建歌曲表
    $creatSong = "create table if not exists song (
        id int(6) unsigned auto_increment primary key, 
        name varchar(30) not null,
        src varchar(100) not null,
        mv varchar(100),
        album int(6) unsigned not null,
        foreign key(album) references album(id)
    )";
    mysqli_query($conn, $creatSong) or die(mysqli_error($conn));

    //创建mv表
    $creatMv = "create table if not exists mv (
        id int(6) unsigned auto_increment primary key, 
        src varchar(100) not null,
        song int(6) unsigned not null,
        foreign key(song) references song(id)
    )";
    mysqli_query($conn, $creatMv) or die(mysqli_error($conn));

    //创建评论表
    $creatComment = "create table if not exists comment (
        id int(6) unsigned auto_increment primary key, 
        content varchar(100) not null,
        time timestamp,
        user int(6) unsigned not null,
        song int(6) unsigned not null,
        foreign key(user) references user(id),
        foreign key(song) references song(id)
    )";
    mysqli_query($conn, $creatComment) or die(mysqli_error($conn));

    //创建用户信息
    $creatUserInfo = "create table if not exists userinfo (
        id int(6) unsigned auto_increment primary key, 
        nikname varchar(15) not null,
        avatar varchar(100),
        sign varchar(30),
        favorite int(6),
        user int(6) unsigned not null,
        foreign key(user) references user(id)
    )";
    mysqli_query($conn, $creatUserInfo) or die(mysqli_error($conn));

    //创建喜欢的音乐
    $creatFavorite = "create table if not exists favorite (
        id int(6) unsigned auto_increment primary key, 
        userInfo int(6) unsigned not null,
        foreign key(userInfo) references userInfo(id)
    );";
    mysqli_query($conn, $creatFavorite) or die(mysqli_error($conn));

    //创建关系表
    $creatRelation = "create table if not exists song_favorite (
        id int(6) unsigned auto_increment primary key, 
        song int(6) unsigned not null,
        favorite int(6) unsigned not null,
        foreign key(song) references song(id),
        foreign key(favorite) references favorite(id)
    )";
    mysqli_query($conn, $creatRelation) or die(mysqli_error($conn));
?>