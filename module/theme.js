define("theme",["storage"],function(storage){
    var theme= {
        init: function () {
            var skin = storage.get('theme') || 'red';
            theme.apply(skin);
        },
        list: ['red', 'purple', 'glass', 'star'],
        //兼容火狐，火狐不支持disabled
        apply: function (skin) {
            var mode;
            if (skin == 'red' || skin == 'purple') mode = 'light'
            else mode = 'dark';
            var msrc = '../../dist/css/' + mode + '/' + mode + '.css';
            var tsrc = '../../dist/css/' + mode + '/' + skin + '.css';
            $('#mode').attr('href', msrc);
            $('#theme').attr('href', tsrc);
            storage.save('theme', skin);
        },
        change: function (skin) {
            theme.apply(skin);
        },
        Next: function () {
            var skin = storage.get('theme') || 'red';
            var themeNext = theme.list.findNext(skin);
            theme.apply(themeNext);
        },
    };
    return theme;
});