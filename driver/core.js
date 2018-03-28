//公共API
var api=require(["api"]);

//UI模块
var ui=require(["ui"],function(ui){
    ui.init();
    //创建列表
    // ui.creatFavoriteList();
    // ui.creatPlayList();
    // ui.creatMvList();
    // ui.creatCommentList();
    //轮播
    ui.flash.init();
    ui.flash.next(3000);
     //主界面拖动
     $('#header').on('mousedown', function (e) {
        ui.container.move(e);
    });
    //阻止冒泡
    $('#LSmask *').click(function () {
        return false;
    });
    //全屏
    $('.icon-full').click(ui.full);
    $('#header').dblclick(ui.full);
    //登录界面左右滑动
    $('.slideBar_item').click(function () {
        $('.slideBar_item.active,.page.active').removeClass('active');
        $(this).addClass('active');
        var index = $(this).index();
        if ($(this).getParent(2).index() == 1) index += 4;
        var page = $('.page').eq(index);
        var type=page.attr('class').split(' ')[1].replace(/\w*-/g,'');
        var url= '../../page/'+type+'/'+type+'.html';
        if(type!='N') page.load(url);
        page.addClass('active');
    });
    $('.tab_item').click(function () {
        $(this).addClass('active');
        $(this).siblings().removeClass('active');
        var id = $(this).index(); //当前操作的元素索引值 
        var number1 = 65 + id * 120;
        var number2 = -id * 330;
        $('.slider').animate({
            marginLeft: number1
        });
        $('.formGroup').animate({
            marginLeft: number2
        });
    });
    //点击遮罩隐藏
    $('#LSmask').click(ui.LS.hide);
    //MV界面
    $('.segment a').click(function () {
        $(this).siblings().removeClass('active');
        $(this).addClass('active');
    });
});

//媒体模块
var media=require(["media"],function(media){
    // media.prepare();
    //按钮组
    //为什么这么写？因为.pause是后来添加的类名，在此之前声明的方法无效
    $('.playGroup').on('click', '.icon-play', function () {
        if (media.status) {
            media.continue();
        }
        else {
            var mediaInfo;
            if (media.type == 'audio') {
                mediaInfo = media.favoriteList[0];
                media.type = 'audio';
                media.star(mediaInfo);
            }
            else {
                mediaInfo = media.mvList[0];
                media.type = 'video';
                media.star(mediaInfo);
            }
        }
    })
    $('.playGroup').on('click', '.icon-pause', function () {
        media.pause();
    })
    $('.icon-next').click(function () {
        media.next();
    });
    $('.icon-prev').click(function () {
        media.prev();
    });
    //播放模式
    $('.PM').click(function () {
        var mode = $(this).attr('class').split(' ')[3].replace(/icon-/g, '');
        media.changePlayMode(mode);
    });
    //播放界面
    $('.musicPic').click(function () {
        media.showInterface();
    });
    //返回
    $('.icon-back').click(function () {
        media.hideInterface();
    });
    //点击进度条直接切换时间
    $('.progress').click(function (e) {
        media.updateProgress(e);
    });
    //调整音量
    $('.vc').on('input propertychange', function () {
        var value = $(this)[0].value;
        media.vol.change(value);
    })
    //静音
    $('.icon-vol').click(function () {
        media.vol.toggle();
    });
    //播放歌单
    $('table').on('click', 'tr', function () {
        media.type = 'audio';
        var index = $(this).index() - 1;
        var mediaInfo = media.favoriteList[index];
        media.star(mediaInfo);
    });
    //播放MV
    $('.mvList').on('click', '.mv', function () {
        media.type = 'video';
        var index = $(this).index();
        var mediaInfo = media.mvList[index];
        media.star(mediaInfo);
    });
});

//通信模块
var net=require(["net","ui","storage"],function(net,ui,storage){
    net.init();
    //点击弹出登录界面
    $('.user').click(function () {
        var bool = net.checkLogin();
        if (!bool) ui.LS.show();
    });
    //提交数据
    $('.sumbit').click(function () {
        var that = $(this);
        var text = that.text();
        var username = that.siblings('.username').val();
        var password = that.siblings('.password').val();
        var userInfo = {
            username: username,
            password: password,
        };

        //失败是成功之母，所以要放前面
        function err(prompt) {
            ui.showAlert(prompt);
            $('.formGroup').clear();
            that.removeAttr('disabled').text(text);
        }
        function suc(prompt){
            $('.behind p').text(prompt);
            $('.user-name').text(userInfo.username);
            ui.LS.preserve(function () {
                ui.LS.hide();
            });
            storage.cookie.set('username',userInfo.username,7);
        }
        
        //直到获取数据之前，按钮不可响应
        that.attr('disabled', 'true').text('提交中...');
        if(text=='注册') userInfo.type='sign';
        else userInfo.type='login';

        //先检查正则相关问题，根据返回值进行相应处理
        setTimeout(function(){
            var prompt;
            var reg = net.checkReg(userInfo);
            switch (reg) {
                case 'null': prompt='用户名及密码不能为空'; break;
                case "length illegal": prompt='用户名及密码均需6-15位以内'; break;
                case 'entry illegal': prompt='用户名需为字母数字组合'; break;
                case 'legal':net.ls(userInfo,suc,err);break;
            }
            if(reg!='legal') err(prompt);
        }, 750);
    });
});

//主题模块
var theme=require(["theme"],function(theme){
    theme.init();
    //切换主题
    $('.icon-skin').click(function () {
        theme.Next();
    });
});