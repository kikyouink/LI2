class local {
    set(key, value) {
        localStorage.setItem(key, value);
    }
    get(key) {
        return localStorage.getItem(key);
    }
    delete(key) {
        localStorage.removeItem(key);
    }
    clear() {
        localStorage.clear();
    }
}
class session {
    set(key, value) {
        sessionStorage.setItem(key, value);
    }
    get(key) {
        return sessionStorage.getItem(key);
    }
    delete(key) {
        sessionStorage.removeItem(key);
    }
    clear() {
        sessionStorage.clear();
    }
}

//已废弃，因为cookie保存在客户端并不安全

// class cookie{
//     set(key, value, expireDays) {
//         var date = new Date();
//         date.setTime(date.getTime() + expireDays * 24 * 3600 * 1000);
//         document.cookie = key + "=" + value + ";expires=" + date.toGMTString();
//     }
//     get(key) {
//         var cookie = document.cookie;
//         var cookieArr = cookie.split(';');
//         var value;
//         for (var i = 0; i < cookieArr.length; i++) {
//             var arr = cookieArr[i].split("=");
//             if (arr[0] == key) {
//                 value = arr[1];
//                 break;
//             }
//         }
//         return value || null;
//     }
//     clear(){
//         this.set('username', 1, -1);
//     }
// }

export class storageModule {
    constructor() {
        this.local = local.prototype;
        this.session = session.prototype;
        // this.cookie=cookie.prototype;
    }
    init() {

    }
    clear() {
        console.log(this.local);
        this.local.clear();
        this.session.clear();
        // this.cookie.clear();
    }
}

let storage = new storageModule();
export { storage }