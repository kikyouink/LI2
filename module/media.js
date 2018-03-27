define("media",function(){
    var media= {
        type: 'audio',
        playMode: 'loop',
        status: null,
        statusInfo: null,
        url: "server/search.php",
        mvList: [],
        favoriteList: [],
        playList: [],
        commentList: [],
        showInfo: function () {
            console.log('media.type: ' + media.type);
            console.log('media.statusInfo: ' + media.statusInfo.singer);
        },
        prepare: function () {
            media.updateInfo(media.favoriteList[0]);
            media.statusInfo = media.favoriteList[0];
        },
        star: function (mediaInfo) {
            var src = mediaInfo.src;
            media.new(src).trigger('play');
            if (media.type == 'video') {
                media.showInterface();
            }
            media.vol.slowUp();
            media.statusInfo = mediaInfo;
        },
        new: function (src) {
            var m;
            if (media.status && media.status[0].tagName.toLocaleLowerCase() == media.type) {
                media.status[0].src = src;
                media.status.trigger('load');
            }
            else {
                if (media.status) media.status.remove();
                if (media.type == 'audio') {
                    m = $('<audio></audio>');
                    m.attr('src', src);
                    $('#mask').append(m);
                }
                else {
                    //new Video()无法使用，既然有new Audio为什么不能有new Video
                    m = $('.videoPlayer').put('video', 'media');
                    m.attr({
                        'src': src,
                        'type': 'video/mp4',
                    });
                }
                media.init(m);
                media.status = m;
            }
            return media.status;
        },
        init: function (m) {
            var obj = {
                onloadstart: function(){
                    console.info('开始加载:' + media.statusInfo.singer + ' - ' + media.statusInfo.song);
                    $('.dot').addClass('active');
                    media.updateInfo(media.statusInfo);
                    media.reset();
                },
                onloadedmetadata: function() {
                    media.updateProgressAuto();
                },
                oncanplay: function() {
                    media.toggle();
                    $('.dot').removeClass('active');
                },
                onerror: function() {
                    console.error('加载出错...');
                    media.next();
                },
                onstalled: function() {
                    $('.dot').addClass('active');
                    console.info('缓冲中...');
                },
                onended: function() {
                    media.next();
                },
            };
            for (var i in obj) {
                m[0][i] = obj[i];
            }
        },
        //从头播放
        continue: function () {
            media.status.trigger('play');
            media.vol.slowUp();
            media.toggle();
        },
        pause: function () {
            media.toggle();
            media.vol.slowDown(function () {
                media.status.trigger('pause');
            });
        },
        next: function () {
            var next;
            if (media.type == 'audio') {
                switch (media.playMode) {
                    case 'loop1':
                        media.star(media.statusInfo)
                        ; break;
                    case 'random':
                        media.star(media.favoriteList.findRandom())
                        ; break;
                    default:
                        next = media.favoriteList.findNext(media.statusInfo);
                        media.star(next)
                        ; break;
                }
            }
            else {
                next = media.mvList.findNext(media.statusInfo);
                media.star(next);
            }
        },
        prev: function () {
            var prev;
            if (media.type == 'audio') {
                switch (media.playMode) {
                    case 'loop1':
                        media.star(media.statusInfo)
                        ; break;
                    case 'random':
                        media.star(media.favoriteList.findRandom())
                        ; break;
                    default:
                        prev = media.favoriteList.findPrev(media.statusInfo);
                        media.star(prev)
                        ; break;
                }
            }
            else {
                prev = media.mvList.findPrev(media.statusInfo);
                media.star(prev);
            }
        },
        changePlayMode: function (mode) {
            var m = ['loop', 'loop1', 'random'];
            var index = m.indexOf(mode);
            var next = m[(index + 1) % 3];
            media.playMode = next;
            $('.PM').removeClass('icon-' + mode).addClass('icon-' + next);
        },
        toggle: function () {
            var play = $('.icon-play');
            var pause = $('.icon-pause');
            play.addClass('icon-pause').removeClass('icon-play');
            pause.addClass('icon-play').removeClass('icon-pause');
            $('.disc').toggleClass('active');
        },
        updateInfo: function (mediaInfo) {
            var picSrc = media.loadSingerSrc(mediaInfo);
            //url括号里面还要加引号，好坑
            $('.musicPic').css('background-image', "url('" + picSrc + "')");
            $('.songName').text(mediaInfo.song);
            $('.singer').text(mediaInfo.singer);
        },
        updateProgress: function (e) {
            var width = e.pageX - $('.progress').offset().left;
            var all = media.status[0].duration;
            media.status[0].currentTime = width * all / $('.progress').width();
            $('.progress_active').css('width', width);
        },
        updateProgressAuto: function (e) {
            var getTime = function (time) {
                var min = parseInt(time / 60);
                var sec = parseInt(time % 60);
                return [min, sec].join(':').replace(/\b(\d)\b/g, "0$1");
            };
            var all = media.status[0].duration;
            var length = $('.progress').width();
            $(".time.r").text(getTime(all));
            setInterval(function () {
                var all = media.status[0].duration;
                var status = media.status[0].currentTime;
                var precent = status / all;
                var width = length * precent;
                $('.progress_active').css('width', width);
                $(".time.l").text(getTime(status));
            }, 500);
        },
        reset: function () {
            $('.progress_active').removeAttr('style');
            var pause = $('.icon-pause');
            pause.addClass('icon-play').removeClass('icon-pause');
            $('.disc').removeClass('active');

        },
        loadSingerSrc: function (mediaInfo) {
            var src = 'assest/img/singer/' + mediaInfo.singer + '.png';
            return src;
        },
        vol: {
            change: function(value){
                if (!media.status) return;
                media.status[0].volume = value;
                $('.icon-mute').removeClass('icon-mute').addClass('icon-vol');
            },
            slowUp: function () {
                media.status[0].volume = 0;
                var limit = $('.vc')[0].value;
                var timer = setInterval(function () {
                    if (media.status[0].volume < Math.min(limit, 0.95)) {
                        media.status[0].volume += 0.05;
                        window.uping = false;
                    }
                    else {
                        clearInterval(timer);
                    }
                }, 60);
            },
            slowDown: function (callback) {
                var timer = setInterval(function () {
                    if (media.status[0].volume > 0.05) {
                        media.status[0].volume -= 0.05;
                    }
                    else {
                        clearInterval(timer);
                        callback();
                    }
                }, 60);
            },
            toggle: function () {
                if (media.status[0].volume != 0) {
                    media.status[0].volume = 0;
                    $('.icon-vol').removeClass('icon-vol').addClass('icon-mute');
                }
                else {
                    media.status[0].volume = $('.vc')[0].value;
                    $('.icon-mute').removeClass('icon-mute').addClass('icon-vol');
                }
            }
        },
        showInterface: function () {
            $('#main').hide();
            if (media.type == 'audio') {
                $('#musicInterface').fadeIn();
            }
            else $('#videoInterface').fadeIn();
        },
        hideInterface: function () {
            if (media.type == 'audio') {
                $('#musicInterface').fadeOut();
            }
            else $('#videoInterface').fadeOut();
            $('#main').show();
        },
    };
    return media;
});