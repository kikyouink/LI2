define("ui",["media"],function(){
    var ui={
        init:function(){
           console.log('ui.init()');
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
        creat:{
            playList: function (data) {
                $('.playList').putDiv('uc', '', 5);
                for (var i = 0; i < data.length; i++) {
                    var uc = $('.uc').eq(i);
                    var tp = uc.putDiv('tp', data[i].count + '万');
                    var icon = tp.put('i', 'iconfont icon-count');
                    var bt = uc.putDiv('bt', data[i].name);
                    var img = uc.put('img');
                    img.attr('src', data[i].picSrc);
                }
            },
            favoriteList: function (data) {
                var num = data.length;
                media.favoriteList=data;
                console.log(media.favoriteList);
                $('tbody').put('tr', '', '', num);
                $('tr').not("tr:first-child").put('td', '', '', 4);
                var th = ['id','song', 'singer', 'album'];
                for (var i = 0; i < num; i++) {
                    var tr = $('tr').eq(i + 1);
                    for (var j = 0; j < 4; j++) {
                        var td = tr.children().eq(j);
                        td.text(data[i][th[j]]);
                    }
                }
            },
            mvList: function (data) {
                $('.mvList').putDiv('mv', '', data.length);
                // console.log(data);
                for (var i = 0; i < data.length; i++) {
                    var mv = $('.mv').eq(i);
                    var tp = mv.putDiv('tp', data[i].count + '万');
                    var icon = tp.put('i', 'iconfont icon-count');
                    var bt = mv.putDiv('bt', data[i].singer + ' - ' + data[i].song);
                    var img = mv.put('img');
                    img.attr('src', data[i].picSrc);
                }
            },
            commentList:function(){
                $('.commentList').putDiv('comment', '', media.commentList.length);
                // console.log(data);
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
                $('#main,#musicInterface').addClass('blur');
            },
            hide: function () {
                $('#LSmask').fadeOut();
                $('#main,#musicInterface').removeClass('blur');
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
                    active.addClass('active').siblings().removeClass('active');
                    if (index > 3) index = -1;
                }, time);
            },
        },
    };
    return ui;
});