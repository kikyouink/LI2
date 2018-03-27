define("storage",function() {
    var storage= {
        save: function (key, value) {
            localStorage.setItem(key, value);
        },
        get: function (key) {
            return localStorage.getItem(key);
        },
        delete: function (key) {
            localStorage.removeItem(key);
        },
    };
    return storage;
    
});