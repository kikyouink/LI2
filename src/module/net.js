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
        var username = this.checkLogin();
        if (username) {
            $('.user-name').text(username);
            this.getUserInfo();
        }
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
        return storage.cookie.get('username');
    }
    getUserInfo() {
        var url = this.musicUrl;
        var obj = { req: 'userInfo' };
        console.log('getUserInfo');
        $.post(url, obj, (result) => {
            this.userInfo = result;
            console.log(result);
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
    loadStar(page, suc, err) {
        var url = this.musicUrl;
        var obj = { req: page };
        $('.page-loading').addClass('active');
        $.post(url, obj, (result) => {
            console.log(result);
            try{
                result = JSON.parse(result);
                console.log('接收' + page + '数据成功');
                suc(result);
            }
            catch(e){
                console.log(e);
                err();
            }
        });

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