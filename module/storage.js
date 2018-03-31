define("storage",function() {
    var storage= {
        local:{
            set: function (key, value) {
                localStorage.setItem(key, value);
            },
            get: function (key) {
                return localStorage.getItem(key);
            },
            delete: function (key) {
                localStorage.removeItem(key);
            },
        },
        cookie:{
            set:function(key, value, expireDays) {  
                var date=new Date(); 
                date.setTime(date.getTime() + expireDays*24*3600*1000);
                document.cookie = key+"="+value+";expires="+date.toGMTString(); 
            },
            get:function(key){
                var cookie=document.cookie;
                var cookieArr=cookie.split(';');
                var value;
                for(var i=0;i<cookieArr.length;i++){
                    var arr = cookieArr[i].split("="); 
                    if( arr[0] == key ){
                        value = arr[1];
                        break;
                    }
                }
                return value||null;
            },
            clear:function(){
                storage.cookie.set('username',1,-1);
            }
        },
    };
    return storage;
    
});