import { storageModule } from './storage';
import { uiModule } from '../module/ui';

let storage = new storageModule();
let ui = new uiModule();
export class netModule {
    constructor() {
        this.lsUrl = '../src/server/ls.php';
        this.musicUrl = '../src/server/music.php';
    }
    init() {
        this.checkLogin()
            .then(() => {
                this.getUserInfo();
            })
            .catch((err) => {
                console.log(err);
            })
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
    checkLogin(callback) {
        var url = this.musicUrl;
        var obj = { req: 'checkLogin' };
        return new Promise((resolve, reject) => {
            $.post(url, obj, (result) => {
                console.log(result);
                if (result == 0) reject('未登录');
                else resolve('获取用户信息成功');
            }, 'json');
        });
    }
    getUserInfo() {
        console.log('获取用户信息');
        var url = this.musicUrl;
        var obj = { req: 'userInfo' };
        $.post(url, obj, (result) => {
            this.userInfo = result;
            console.log(result);
            $('.user-name').text(result.nickname);
        }, 'json');
    }
    loginOut() {
        var url = this.musicUrl;
        var obj = { action: 'loginOut' };
        $.post(url, obj, (result) => {
            $(".user-name").text('欢迎！');
            ui.showAlert('已退出，请重新登录', 1);
        });
        storage.clear();
    }
    loadStar(pagetype) {
        var url = this.musicUrl;
        if(!this.index) this.index=0;
        console.log(this.index);
        var obj = {
            req: pagetype,
            star: this.index++
        }
        $('.page-loading').addClass('active');
        return new Promise(function (resolve, reject) {
            $.post(url, obj, (result) => {
                console.log(result);
                try {
                    result = JSON.parse(result);
                    resolve(result);
                }
                catch (e) {
                    console.log("err");
                    reject(result);
                }
            });
        });
    }
    loadDone(page) {
        page.addClass('active');
        $('.page-loading').removeClass('active');
    }
    //登录注册2 in 1
    ls(obj, suc, err) {
        var url = this.lsUrl;
        var prompt;
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
                this.getUserInfo();
                suc(prompt);
            }
            else err(prompt);
        }, 'text');
    }
    //obj包含搜索的值与搜索模式
    sreach(obj) {
        var url = this.musicUrl;
        $.post(url, obj, (result) => {
            $('.page.page-search').addClass('active').siblings().removeClass('active');
        });
    }
}