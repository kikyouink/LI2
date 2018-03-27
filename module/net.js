define("net",["ui"],function(ui) {
    var net= {
        checkReg: function (obj, mode) {
            for (var i in obj) {
                if (obj[i].length == 0) return 0;
                if (obj[i].length < 6 || obj[i].length > 15) return 1;
            }
            var reg;
            mode = mode || '';
            switch (mode) {
                case 'remix': reg = /[^A-Za-z0-9_\-\u4e00-\u9fa5]+/g; break;//包括汉字
                default: reg = /\W+/g; break;
            }
            return reg.test(obj.username);
        },
        sign: function (obj, callback) {
            obj.type = 'sign';
            net.post(obj, '注册成功', callback);
        },
        login: function (obj, callback) {
            obj.type = 'login';
            net.post(obj, '登录成功', callback);
        },
        post: function (obj, prompt, callback) {
            var url="page/main/main.php";
            $.post(url,obj,function(result){
                if(result==prompt){
                    $('.behind p').text(prompt);
                    ui.LS.preserve(function () {
                        ui.LS.hide();
                        $('.user_name').text(obj.username);
                    });
                 }
                 else ui.showAlert(result,callback);
             },'text');
        },
        checkLogin: function () {
            return false;
        },
    };
    return net;
});