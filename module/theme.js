define("theme",["storage"],function(storage){
    var theme= {
        init: function () {
            var skin = storage.local.get('theme') || 'glass';
            theme.apply(skin);
        },
        list: [ 'glass', 'star','rabbit'],
        //兼容火狐，火狐不支持disabled
        apply: function (skin) {
            var src = '../../dist/css/' + skin + '.css';
            $('#theme').attr('href', src);
            storage.local.set('theme', skin);
        },
        change: function (skin) {
            theme.apply(skin);
        },
        Next: function () {
            var skin = storage.local.get('theme') || 'red';
            var themeNext = theme.list.findNext(skin);
            theme.apply(themeNext);
        },
    };
    return theme;
});