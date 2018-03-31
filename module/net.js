define("net",["storage"],function(storage) {
    var net= {
        lsUrl:'../../server/ls.php',
        musicUrl:'../../server/music.php',
        init:function(){
            console.log('接受数据中...');
            var username=storage.cookie.get('username');
            if(username) $('.user-name').text(username);
            $.post(this.musicUrl,function(){
                console.log('已执行');
            });
        },
        checkLogin: function () {
            return storage.cookie.get('username');
        },
        checkReg: function (obj, mode) {
            for (var i in obj) {
                if(i!='type'){
                    if (obj[i].length == 0) return 'null';
                    if (obj[i].length < 6 || obj[i].length > 15) return 'length illegal';
                }
            }
            var reg;
            mode = mode || '';
            switch (mode) {
                case 'remix': reg = /[^A-Za-z0-9_\-\u4e00-\u9fa5]+/g; break;//包括汉字
                default: reg = /\W+/g; break;
            }
            if(reg.test(obj.username)==true) return 'entry illegal';
            else return 'legal';
        },
        ls: function (obj,suc,err) {
            var url=net.lsUrl;
            var prompt;
            $.post(url,obj,function(result){
                switch(result){
                    case 'login succeed':prompt='登录成功';break;
                    case 'password error':prompt='密码错误';break;
                    case 'user not exsits':prompt='用户不存在';break;
                    case 'user exsits':prompt='用户名已存在，请登录';break;
                    case 'sign succeed':prompt='注册成功';break;
                }
                if(result=='login succeed'||result=='sign succeed'){
                    suc(prompt);
                 }
                 else err(prompt);
             },'text');
        },
        sreach:function(obj){
            var url=net.musicUrl;
            $.post(url,obj,function(result){
                $('.page.page-search').addClass('active').siblings().removeClass('active');
                // $('#slideBar li')
            });
        },
        loadPage:function(type){
            var url=net.musicUrl;
            $.post(url,{page:type},function(result){
                console.log('接收page-'+type+'数据成功');
                return result;
            },'json');

        }
    };
    return net;
});