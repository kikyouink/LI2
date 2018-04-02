export class mediaModule {
    constructor() {
        let param = {
            type: 'audio',
            playMode: 'loop',
            url: "server/search.php",
            status: undefined,
            statusInfo: undefined,
            mvList: undefined,
            favoriteList: undefined,
            playList: undefined,
            commentList: undefined,
        }
        for (let i in param) {
            this[i] = param[i];
        }
    }
    showInfo() {
        console.log('this.type: ' + this.type);
        console.log('this.statusInfo: ' + this.statusInfo.singer);
    }
    prepare() {
        this.updateInfo(this.favoriteList[0]);
        this.statusInfo = this.favoriteList[0];
    }
    star(mediaInfo) {
        var src = "http://music.163.com/song/media/outer/url?id=" + mediaInfo.src + ".mp3";
        this.new(src).trigger('play');
        if (this.type == "video") {
            this.showInterface();
        }
        this.statusInfo = mediaInfo;
        this.volSlowUp();
    }
    new(src) {
        var m;
        if (this.status && this.status[0].tagName.toLocaleLowerCase() == this.type) {
            this.status[0].src = src;
            this.status.trigger('load');
        }
        else {
            if (this.status) this.status.remove();
            if (this.type == 'audio') {
                m = $('<audio></audio>');
                m.attr('src', src);
                $('#backgound').append(m);
            }
            else {
                //new Video()无法使用，既然有new Audio为什么不能有new Video
                m = $('.videoPlayer').put('video', 'media');
                m.attr({
                    'src': src,
                    'type': 'video/mp4',
                });
            }
            this.init(m);
            this.status = m;
        }
        return this.status;
    }
    init(m) {
        var obj = {
            onloadstart: () => {
                console.info('开始加载:' + this.statusInfo.singer + ' - ' + this.statusInfo.song);
                $('.dot').addClass('active');
                this.updateInfo(this.statusInfo);
                this.reset();
            },
            onloadedmetadata: () => {
                this.updateProgressAuto();
            },
            oncanplay: () => {
                this.toggle();
                $('.dot').removeClass('active');
            },
            onerror: () => {
                console.error('加载出错...');
                // this.next();
            },
            onstalled: () => {
                $('.dot').removeClass('active');
                console.info('缓冲中...');
            },
            onended: () => {
                this.next();
            },
        };
        for (var i in obj) {
            m[0][i] = obj[i];
        }
    }
    //从头播放
    continue() {
        this.status.trigger('play');
        this.volSlowUp();
        this.toggle();
    }
    pause() {
        this.toggle();
        this.volSlowDown(function () {
            this.status.trigger('pause');
        });
    }
    next() {
        var next;
        if (this.type == 'audio') {
            switch (this.playMode) {
                case 'loop1':
                    this.star(this.statusInfo)
                        ; break;
                case 'random':
                    this.star(this.favoriteList.findRandom())
                        ; break;
                default:
                    next = this.favoriteList.findNext(this.statusInfo);
                    this.star(next)
                        ; break;
            }
        }
        else {
            next = this.mvList.findNext(this.statusInfo);
            this.star(next);
        }
    }
    prev() {
        var prev;
        if (this.type == 'audio') {
            switch (this.playMode) {
                case 'loop1':
                    this.star(this.statusInfo)
                        ; break;
                case 'random':
                    this.star(this.favoriteList.findRandom())
                        ; break;
                default:
                    prev = this.favoriteList.findPrev(this.statusInfo);
                    this.star(prev)
                        ; break;
            }
        }
        else {
            prev = this.mvList.findPrev(this.statusInfo);
            this.star(prev);
        }
    }
    changePlayMode(mode) {
        var m = ['loop', 'loop1', 'random'];
        var index = m.indexOf(mode);
        var next = m[(index + 1) % 3];
        this.playMode = next;
        $('.PM').removeClass('icon-' + mode).addClass('icon-' + next);
    }
    toggle() {
        var play = $('.icon-play');
        var pause = $('.icon-pause');
        play.addClass('icon-pause').removeClass('icon-play');
        pause.addClass('icon-play').removeClass('icon-pause');
        $('.disc').toggleClass('active');
    }
    updateInfo(mediaInfo) {
        var avatar = mediaInfo.avatar;
        //url括号里面还要加引号，好坑
        $('.music-pic').css('background-image', "url('" + avatar + "?param=200y200')");
        $('.music-name').text(mediaInfo.song);
        $('.singer').text(mediaInfo.singer);
    }
    updateProgress(e) {
        var width = e.pageX - $('.progress').offset().left;
        var all = this.status[0].duration;
        this.status[0].currentTime = width * all / $('.progress').width();
        $('.progress-active').css('width', width);
    }
    updateProgressAuto(e) {
        var getTime = function (time) {
            var min = parseInt(time / 60);
            var sec = parseInt(time % 60);
            return [min, sec].join(':').replace(/\b(\d)\b/g, "0$1");
        };
        var all = this.status[0].duration;
        var length = $('.progress').width();
        $(".time.r").text(getTime(all));
        setInterval(() => {
            var all = this.status[0].duration;
            var status = this.status[0].currentTime;
            var precent = status / all;
            var width = length * precent;
            $('.progress-active').css('width', width);
            $(".time.l").text(getTime(status));
        }, 500);
    }
    reset() {
        $('.progress-active').removeAttr('style');
        var pause = $('.icon-pause');
        pause.addClass('icon-play').removeClass('icon-pause');
        $('.disc').removeClass('active');

    }
    loadSingerSrc(mediaInfo) {
        var src = '';
        return src;
    }
    volChange(value) {
        if (!this.status) return;
        this.status[0].volume = value;
        $('.icon-mute').removeClass('icon-mute').addClass('icon-vol');
    }
    volSlowUp() {
        this.status[0].volume = 0;
        var limit = $('.vc')[0].value;
        var timer = setInterval(() => {
            if (this.status[0].volume < Math.min(limit, 0.95)) {
                this.status[0].volume += 0.05;
            }
            else {
                clearInterval(timer);
            }
        }, 60);
    }
    volSlowDown(callback) {
        var timer = setInterval(() => {
            if (this.status[0].volume > 0.05) {
                this.status[0].volume -= 0.05;
            }
            else {
                clearInterval(timer);
                callback();
            }
        }, 60);
    }
    volToggle() {
        if (this.status[0].volume != 0) {
            this.status[0].volume = 0;
            $('.icon-vol').removeClass('icon-vol').addClass('icon-mute');
        }
        else {
            this.status[0].volume = $('.vc')[0].value;
            $('.icon-mute').removeClass('icon-mute').addClass('icon-vol');
        }
    }
    showInterface() {
        $('#main').hide();
        if (this.type == 'audio') {
            $('#musicInterface').fadeIn();
        }
        else $('#videoInterface').fadeIn();
    }
    hideInterface() {
        if (this.type == 'audio') {
            $('#musicInterface').fadeOut();
        }
        else $('#videoInterface').fadeOut();
        $('#main').show();
    }
}