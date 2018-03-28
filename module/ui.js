define("ui",function(){
    var ui={
        init:function(){
            var page=$('.page-found');
            page.load('../../page/found/found.html');
        },
        full: function () {
            $('#container').removeAttr('style').toggleClass('full');
        },
        showAlert: function (text, callback) {
            var alert = $('body').putDiv('alert normal', text);
            setTimeout(function () {
                alert.fadeOut();
                alert.remove();
                if (callback) callback();
            }, 2000);
        },
        creatPlayList: function () {
            $('.playList').putDiv('uc', '', 5);
            for (var i = 0; i < media.playList.length; i++) {
                var uc = $('.uc').eq(i);
                var tp = uc.putDiv('tp', media.playList[i].count + '万');
                var icon = tp.put('i', 'iconfont icon-count');
                var bt = uc.putDiv('bt', media.playList[i].name);
                var img = uc.put('img');
                img.attr('src', media.playList[i].picSrc);
            }
        },
        creatFavoriteList: function () {
            var num = media.favoriteList.length;
            $('tbody').put('tr', '', '', num);
            $('tr').not("tr:first-child").put('td', '', '', 4);
            var th = ['song', 'singer', 'aublm'];
            for (var i = 0; i < num; i++) {
                var tr = $('tr').eq(i + 1);
                for (var j = 0; j < 4; j++) {
                    var td = tr.children().eq(j);
                    if (j == 0) td.text('0' + (i + 1));
                    else td.text(media.favoriteList[i][th[j - 1]])
                }
            }
        },
        creatMvList: function () {
            $('.mvList').putDiv('mv', '', media.mvList.length);
            // console.log(media.mvList);
            for (var i = 0; i < media.mvList.length; i++) {
                var mv = $('.mv').eq(i);
                var tp = mv.putDiv('tp', media.mvList[i].count + '万');
                var icon = tp.put('i', 'iconfont icon-count');
                var bt = mv.putDiv('bt', media.mvList[i].singer + ' - ' + media.mvList[i].song);
                var img = mv.put('img');
                img.attr('src', media.mvList[i].picSrc);
            }
        },
        creatCommentList:function(){
            $('.commentList').putDiv('comment', '', media.commentList.length);
            // console.log(media.mvList);
            for (var i = 0; i < media.commentList.length; i++) {
                var comment = $('.comment').eq(i);
                var avatar=comment.putDiv('avatar');
                var img = avatar.put('img');
                img.attr('src', media.commentList[i].picSrc);
                var content=comment.putDiv('content');
                var username=content.put('strong','cname',media.commentList[i].user+':');
                var p=content.put('p','',media.commentList[i].content);
                var time=content.put('span','',media.commentList[i].time);
            }
        },
        container: {
            move: function (e) {
                var $box = $('#container');
                var position = $box.position();
                $box.posix = {
                    'x': e.pageX - position.left,
                    'y': e.pageY - position.top
                };
                $.extend(document, {
                    'move': true,
                    'move_target': $box
                });
            },
        },
        LS: {
            show: function () {
                $('#LSmask').fadeIn();
                $('#main,#mask').addClass('blur');
            },
            hide: function () {
                $('#LSmask').fadeOut();
                $('#main,#mask').removeClass('blur');
            },
            preserve: function (callback) {
                $('.front').toggleClass('active');
                $('.behind').toggleClass('active');
                if (callback) {
                    setTimeout(function () {
                        callback();
                    }, 2000);
                }

            }
        },
        flash:{
            init: function () {
                //获取图片链接
                
            },
            next: function (time) {
                var index = 0;
                var li = ["p5", "p4", "p3", "p2", "p1"];
                setInterval(function () {
                    index++;
                    li.push(li[0]);
                    li.shift();
                    $('.pic').each(function (i, e) {
                        $(e).removeClass().addClass('pic ' + li[i]);
                    })
                    var active = $('.btn-list').children().eq(index);
                    active.addClass('blue').siblings().removeClass('blue');
                    if (index > 3) index = -1;
                }, time);
            },
        }
    };
    return ui;
});