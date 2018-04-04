
class update {
    playList(data) {
        $('.playList').putDiv('uc', '', 5);
        for (var i = 0; i < data.length; i++) {
            var uc = $('.uc').eq(i);
            var tp = uc.putDiv('tp', data[i].count + '万');
            var icon = tp.put('i', 'iconfont icon-count');
            var bt = uc.putDiv('bt', data[i].name);
            var img = uc.put('img');
            img.attr('src', data[i].picSrc);
        }
    }
    favoriteList(data) {
        var th = ['id', 'song', 'singer', 'album'];
        var num1 = data.length;
        var num2 = th.length;
        for (var i = 0; i < num1; i++) {
            var tr = $('tbody').put('tr');
            // console.log(tr);
            tr.put('td','a','a',4);
            // $('tr').put('td', '', '', 4);
            // console.log(tr.index());
            // for (var j = 0; j < num2; j++) {
            //     var td = tr.children().eq(j);
            //     td.text(data[i][th[j]]);
            // }
        }
    }
    mvList(data) {
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
    }
    commentList() {
        $('.commentList').putDiv('comment', '', data.length);
        // console.log(data);
        for (var i = 0; i < media.commentList.length; i++) {
            var comment = $('.comment').eq(i);
            var avatar = comment.putDiv('avatar');
            var img = avatar.put('img');
            img.attr('src', media.commentList[i].picSrc);
            var content = comment.putDiv('content');
            var username = content.put('strong', 'cname', media.commentList[i].user + ':');
            var p = content.put('p', '', media.commentList[i].content);
            var time = content.put('span', '', media.commentList[i].time);
        }
    }
}
class LS {
    show() {
        $('#LSmask').fadeIn();
        $('#main,#musicInterface').addClass('blur');
    }
    hide() {
        $('#LSmask').fadeOut();
        $('#main,#musicInterface').removeClass('blur');
    }
    preserve(callback) {
        $('.front').toggleClass('active');
        $('.behind').toggleClass('active');
        if (callback) {
            setTimeout(function () {
                callback();
            }, 2000);
        }

    }
}
class flash {
    init() {
        //获取图片链接
    }
    next(time) {
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
    }
}
export class uiModule {
    constructor() {
        this.update = update.prototype;
        this.LS = LS.prototype;
        this.flash = flash.prototype;
    }
    init() {

    }
    full() {
        $('#container').removeAttr('style').toggleClass('full');
    }
    showAlert(text, type, callback) {
        var alert = $('body').putDiv('alert');
        if (type) {
            var icon;
            switch (type) {
                case 1: icon = 'success'; break;
                case 2: icon = 'error'; break;
                case 3: icon = 'prompt'
            }
            alert.put('i', 'iconfont icon-' + icon);
        }
        var msg = alert.put('span', '', text);
        alert.fadeIn();
        setTimeout(function () {
            alert.fadeOut(function () {
                alert.remove();
            });
            if (callback) callback();
        }, 2000);
        console.log(text);
    }
    loadDone(page) {
        page.addClass('active');
        $('.page-loading').removeClass('active');
    }
}