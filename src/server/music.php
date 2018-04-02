<?php
	include 'prepare.php';
    include 'search.php';
    @$page=$_POST['page'];
    // $page='favorite';
    if(isset($page)){
        switch($page){
            case 'favorite':
            searchSong();
            break;
        }
    }
    
    mysqli_close($conn); 
?>