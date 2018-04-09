class update {
    foundList(data) {
        console.log(data["flash"]);
        console.log(data["playlist"]);
        this.flashList(data["flash"]);
        this.playList(data["playlist"]);
    }
    flashList(data) {
        var i = 0;
        $(".picimg").each(function () {
            $(this).attr("src", data[i++].picSrc);
        })
    }
    playList(data) {
        $('.play-list').putDiv('uc', '', 5);
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
        var str = '';
        var length = $('tr').length / 2 - 1;
        for (var i = 0; i < num1; i++) {
            str += "<tr>";
            for (var j = 0; j < num2; j++) {
                if (j == 0) str += "<td>" + (++length) + "</td>";
                else str += "<td>" + data[i][th[j]] + "</td>";
            }
            str += "</tr>";
        }
        var node = $(str);
        $('tbody').append(node);
    }
    mvList(data) {
        $('.mv-list').putDiv('mv', '', data.length);
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
    commentList(data) {
        $('.comment').remove();
        $('.cnum').text('0');
        var num = data.length;
        $('.cnum').text(num);
        $('.comment-list').putDiv('comment', '', num);
        for (var i = 0; i < num; i++) {
            var comment = $('.comment').eq(i);
            var avatar = comment.putDiv('avatar');
            var img = avatar.put('img');
            var content = comment.putDiv('content');
            var username = content.put('strong', 'cname', data[i].user + ':');
            var p = content.put('p', '', data[i].content);
            var time = content.put('span', '', data[i].time);
            img.attr('src', data[i].avatar + '?param=50y50');
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
    showAlert(prompt, type, callback) {
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
        var msg = alert.put('span', '', prompt);
        alert.fadeIn();
        setTimeout(function () {
            alert.fadeOut(function () {
                alert.remove();
            });
            if (callback) callback();
        }, 2000);
        console.log(prompt);
    }
    showErr(e) {
        var prompt, type;
        switch (e) {
            case 'not login': prompt = "请先登录"; type = 3; break;
            case 'no more': prompt = "已无更多"; type = 3; break;
            case 'empty': prompt = "歌曲列表为空"; type = 3; break;
            case 'no comment': prompt = "歌曲暂无评论"; type = 3; break;
            default: prompt = "获取数据失败"; type = 2;
        }
        this.showAlert(prompt, type);
    }
}

let ui = new uiModule();
export { ui };