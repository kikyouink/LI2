import { storage } from './storage';
import { ui } from '../module/ui';
import { media } from '../module/media'

class netModule {
    constructor() {
        this.lsUrl = '../src/server/ls.php';
        this.musicUrl = '../src/server/music.php';
        this.index = 0;
        this.logined = false;
        this.userInfo = null;
    }
    init() {
        this.checkLogin()
            .then(() => {
                this.logined = true;
                return this.getUserInfo();
            })
            .then((result) => {
                this.handleUserInfo(result);
            })
            .catch((err) => {
                console.log(err);
            })
        this.loadStar($(".page-found"));

    }
    checkReg(obj, mode) {
        for (var i in obj) {
            if (i != 'type') {
                if (obj[i].length == 0) return 'null';
                if (obj[i].length < 6 || obj[i].length > 15) return 'length illegal';
            }
        }
        var reg;
        mode = mode || '';
        switch (mode) {
            case 'remix': reg = /[^A-Za-z0-9_\-\u4e00-\u9fa5]+/g; break;//包括汉字
            default: reg = /\W+/g; break;
        };
        if (reg.test(obj.username) == true) return 'character illegal';
        return 'legal';
    }
    checkLogin() {
        var url = this.musicUrl;
        var obj = { req: 'checkLogin' };
        return new Promise((resolve, reject) => {
            $.post(url, obj, (result) => {
                if (result) resolve('获取用户信息成功');
                else reject('未登录');
            }, 'json');
        });
    }
    getUserInfo() {
        console.log('获取用户信息');
        var url = this.musicUrl;
        var obj = { req: 'userInfo' };
        return new Promise((resolve, reject) => {
            $.post(url, obj, (result) => {
                console.log(result);
                this.userInfo = result;
                resolve(result);
            }, 'json');
        });
    }
    handleUserInfo(result) {
        $('.user-id').text(result.id);
        $('.user-sign').text(result.sign);
        $('.user-nickname').text(result.nickname);
        $('.user-avatar').empty().css("background-image", "url('" + result.avatar + "')");
    }
    getComment(id) {
        var url = this.musicUrl;
        var obj = {
            req: 'comment',
            song_id: id
        }
        var load = new Promise((resolve, reject) => {
            $.post(url, obj, (result) => {
                try {
                    result = JSON.parse(result);
                    resolve(result);
                }
                catch (e) {
                    reject(result);
                }
            });
        })
        load.then((result) => {
            media.reciveList('commentList', result);
        })
            .catch((e) => {
                $('.comment').remove();
                $('.cnum').text('0');
                console.log(e);
                ui.showErr(e);
            });
    }
    loadStar(page) {
        var url = this.musicUrl;
        var pagetype = page.attr('class').split(' ')[1];
        var list = pagetype.replace(/page-/g, "") + "List";
        var obj = { req: pagetype }
        if (pagetype == "page-favorite") obj.star = this.index++;
        $('.page-loading').addClass('active');
        var load = new Promise((resolve, reject) => {
            $.post(url, obj, (result) => {
                console.log(result);
                try {
                    result = JSON.parse(result);
                    resolve(result);
                }
                catch (e) {
                    this.index--;
                    reject(result);
                }
            });
        })
        load.then((result) => {
            page.addClass('loaded');
            media.reciveList(list, result);
            this.loadDone(page);
        })
            .catch((e) => {
                console.log(e);
                ui.showErr(e);
                this.loadDone(page);
            });
    }
    loadDone(page) {
        var i = 0;
        var index = page.index();
        if (index > 3) {
            index -= 4;
            i = 1;
        }
        $('#slideBar li.active').removeClass('active');
        $('#slideBar div').eq(i).find('li').eq(index).addClass('active');
        page.addClass('active').siblings().removeClass('active');
        $('.page-loading').removeClass('active');
    }
    //登录注册2 in 1
    ls(obj) {
        var url = this.lsUrl;
        var prompt;
        var ls = new Promise((resolve, reject) => {
            $.post(url, obj, (result) => {
                switch (result) {
                    case 'login succeed': prompt = '登录成功'; break;
                    case 'password error': prompt = '密码错误'; break;
                    case 'user not exsits': prompt = '用户不存在'; break;
                    case 'user exsits': prompt = '用户名已存在，请登录'; break;
                    case 'sign succeed': prompt = '注册成功'; break;
                    default: ui.showAlert(result);
                }
                if (result == 'login succeed' || result == 'sign succeed') {
                    resolve(prompt);
                }
                else reject(prompt);
            }, 'text');
        });
        ls.then((prompt) => {
            this.logined = true;
            this.getUserInfo().then((result) => {
                this.handleUserInfo(result);
            });
            $('.behind p').text(prompt);
            ui.LS.preserve(function () {
                ui.LS.hide();
            });
        }).catch((prompt) => {
            var text;
            if (obj.type == 'login') text = '登录';
            else text = '注册'
            net.lsErr(prompt, text);
        })
    }
    lsErr(prompt, text) {
        ui.showAlert(prompt, 2);
        $('.formGroup').clearP();
        $(".sumbit").removeAttr('disabled').text(text);
    }
    loginOut() {
        var url = this.musicUrl;
        var obj = { action: 'loginOut' };
        $.post(url, obj, (result) => {
            ui.showAlert('已退出，请重新登录', 1, function () {
                location.reload();
            });
        });
        storage.clear();
    }
    //obj包含搜索的值与搜索模式
    sreach(obj) {
        var url = this.musicUrl;
        $.post(url, obj, (result) => {
            $('.page.page-search').addClass('active').siblings().removeClass('active');
        });
    }
}

let net = new netModule();
export { net }