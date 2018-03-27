define("api",function(){Array.prototype.findNext=function(t){var e=this.length,n=this.indexOf(t);return n+1==e?this[0]:this[n+1]},Array.prototype.findPrev=function(t){var e=this.length,n=this.indexOf(t);return n-1<0?this[e-1]:this[n-1]},Array.prototype.findRandom=function(){var t=this.length;return this[parseInt(Math.random()*t)]},Date.prototype.format=function(t){var e={"M+":this.getMonth()+1,"d+":this.getDate(),"h+":this.getHours(),"m+":this.getMinutes(),"s+":this.getSeconds(),"q+":Math.floor((this.getMonth()+3)/3),S:this.getMilliseconds()};for(var n in/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(this.getFullYear()+"").substr(4-RegExp.$1.length))),e)new RegExp("("+n+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[n]:("00"+e[n]).substr((""+e[n]).length)));return t},$.fn.extend({put:function(t,e,n,r){if(e=e||"",n=n||"",Array.isArray(e)&&Array.isArray(n)){for(var s=[],i=0;i<e.length;i++){(a=$("<"+t+"></"+t+">")).addClass(e[i]),a.text(n[i]),s.push(a)}$(this).append(s)}else{if(!r)return(a=$("<"+t+"></"+t+">")).addClass(e),a.text(n),$(this).append(a),a;for(s=[],i=0;i<r;i++){var a;(a=$("<"+t+"></"+t+">")).addClass(e),a.text(n),s.push(a)}$(this).append(s)}},putDiv:function(t,e,n){if(t=t||"",e=e||"",Array.isArray(t)&&Array.isArray(e)){for(var r=[],s=0;s<t.length;s++){(i=$("<div></div>")).addClass(t[s]),i.text(e[s]),r.push(i)}$(this).append(r)}else{if(!n)return(i=$("<div></div>")).addClass(t),i.text(e),$(this).append(i),i;for(r=[],s=0;s<n;s++){var i;(i=$("<div></div>")).addClass(t),i.text(e),r.push(i)}$(this).append(r)}},getParent:function(t){for(var e;t--;)e=e?e.parent():$(this).parent();return e}}),$(document).mousemove(function(t){if(this.move){var e=document.move_target?document.move_target.posix:{x:0,y:0};return(document.call_down||function(){$("#container").css("transition","none"),$(this.move_target).css({top:t.pageY-e.y,left:t.pageX-e.x})}).call(this,t,e),!1}}).mouseup(function(t){this.move&&((document.call_up||function(){}).call(this,t),$.extend(this,{move:!1,move_target:null,call_down:!1,call_up:!1}),$("#container").css("transition","all 0.5s"))})});
define("ui",function(){return{init:function(){$(".page-found").load("../../page/found/found.html")},full:function(){$("#container").removeAttr("style").toggleClass("full")},showAlert:function(t,i){var e=$("body").putDiv("alert normal",t);setTimeout(function(){i&&i(),e.remove()},2e3)},creatPlayList:function(){$(".playList").putDiv("uc","",5);for(var t=0;t<media.playList.length;t++){var i=$(".uc").eq(t);i.putDiv("tp",media.playList[t].count+"万").put("i","iconfont icon-count"),i.putDiv("bt",media.playList[t].name);i.put("img").attr("src",media.playList[t].picSrc)}},creatFavoriteList:function(){var t=media.favoriteList.length;$("tbody").put("tr","","",t),$("tr").not("tr:first-child").put("td","","",4);for(var i=["song","singer","aublm"],e=0;e<t;e++)for(var n=$("tr").eq(e+1),a=0;a<4;a++){var o=n.children().eq(a);0==a?o.text("0"+(e+1)):o.text(media.favoriteList[e][i[a-1]])}},creatMvList:function(){$(".mvList").putDiv("mv","",media.mvList.length);for(var t=0;t<media.mvList.length;t++){var i=$(".mv").eq(t);i.putDiv("tp",media.mvList[t].count+"万").put("i","iconfont icon-count"),i.putDiv("bt",media.mvList[t].singer+" - "+media.mvList[t].song);i.put("img").attr("src",media.mvList[t].picSrc)}},creatCommentList:function(){$(".commentList").putDiv("comment","",media.commentList.length);for(var t=0;t<media.commentList.length;t++){var i=$(".comment").eq(t);i.putDiv("avatar").put("img").attr("src",media.commentList[t].picSrc);var e=i.putDiv("content");e.put("strong","cname",media.commentList[t].user+":"),e.put("p","",media.commentList[t].content),e.put("span","",media.commentList[t].time)}},container:{move:function(t){var i=$("#container"),e=i.position();i.posix={x:t.pageX-e.left,y:t.pageY-e.top},$.extend(document,{move:!0,move_target:i})}},LS:{show:function(){$("#LSmask").fadeIn(),$("#main,#mask").addClass("blur")},hide:function(){$("#LSmask").fadeOut(),$("#main,#mask").removeClass("blur")},preserve:function(t){$(".front").toggleClass("active"),$(".behind").toggleClass("active"),t&&setTimeout(function(){t()},2e3)}},flash:{init:function(){},next:function(t){var i=0,e=["p5","p4","p3","p2","p1"];setInterval(function(){i++,e.push(e[0]),e.shift(),$(".pic").each(function(t,i){$(i).removeClass().addClass("pic "+e[t])}),$(".btn-list").children().eq(i).addClass("blue").siblings().removeClass("blue"),3<i&&(i=-1)},t)}}}});
define("media",function(){var n={type:"audio",playMode:"loop",status:null,statusInfo:null,url:"server/search.php",mvList:[],favoriteList:[],playList:[],commentList:[],showInfo:function(){console.log("media.type: "+n.type),console.log("media.statusInfo: "+n.statusInfo.singer)},prepare:function(){n.updateInfo(n.favoriteList[0]),n.statusInfo=n.favoriteList[0]},star:function(t){var e=t.src;n.new(e).trigger("play"),"video"==n.type&&n.showInterface(),n.vol.slowUp(),n.statusInfo=t},new:function(t){var e;return n.status&&n.status[0].tagName.toLocaleLowerCase()==n.type?(n.status[0].src=t,n.status.trigger("load")):(n.status&&n.status.remove(),"audio"==n.type?((e=$("<audio></audio>")).attr("src",t),$("#mask").append(e)):(e=$(".videoPlayer").put("video","media")).attr({src:t,type:"video/mp4"}),n.init(e),n.status=e),n.status},init:function(t){var e={onloadstart:function(){console.info("开始加载:"+n.statusInfo.singer+" - "+n.statusInfo.song),$(".dot").addClass("active"),n.updateInfo(n.statusInfo),n.reset()},onloadedmetadata:function(){n.updateProgressAuto()},oncanplay:function(){n.toggle(),$(".dot").removeClass("active")},onerror:function(){console.error("加载出错..."),n.next()},onstalled:function(){$(".dot").addClass("active"),console.info("缓冲中...")},onended:function(){n.next()}};for(var s in e)t[0][s]=e[s]},continue:function(){n.status.trigger("play"),n.vol.slowUp(),n.toggle()},pause:function(){n.toggle(),n.vol.slowDown(function(){n.status.trigger("pause")})},next:function(){var t;if("audio"==n.type)switch(n.playMode){case"loop1":n.star(n.statusInfo);break;case"random":n.star(n.favoriteList.findRandom());break;default:t=n.favoriteList.findNext(n.statusInfo),n.star(t)}else t=n.mvList.findNext(n.statusInfo),n.star(t)},prev:function(){var t;if("audio"==n.type)switch(n.playMode){case"loop1":n.star(n.statusInfo);break;case"random":n.star(n.favoriteList.findRandom());break;default:t=n.favoriteList.findPrev(n.statusInfo),n.star(t)}else t=n.mvList.findPrev(n.statusInfo),n.star(t)},changePlayMode:function(t){var e=["loop","loop1","random"],s=e[(e.indexOf(t)+1)%3];n.playMode=s,$(".PM").removeClass("icon-"+t).addClass("icon-"+s)},toggle:function(){var t=$(".icon-play"),e=$(".icon-pause");t.addClass("icon-pause").removeClass("icon-play"),e.addClass("icon-play").removeClass("icon-pause"),$(".disc").toggleClass("active")},updateInfo:function(t){var e=n.loadSingerSrc(t);$(".musicPic").css("background-image","url('"+e+"')"),$(".songName").text(t.song),$(".singer").text(t.singer)},updateProgress:function(t){var e=t.pageX-$(".progress").offset().left,s=n.status[0].duration;n.status[0].currentTime=e*s/$(".progress").width(),$(".progress_active").css("width",e)},updateProgressAuto:function(t){var a=function(t){return[parseInt(t/60),parseInt(t%60)].join(":").replace(/\b(\d)\b/g,"0$1")},e=n.status[0].duration,o=$(".progress").width();$(".time.r").text(a(e)),setInterval(function(){var t=n.status[0].duration,e=n.status[0].currentTime,s=o*(e/t);$(".progress_active").css("width",s),$(".time.l").text(a(e))},500)},reset:function(){$(".progress_active").removeAttr("style"),$(".icon-pause").addClass("icon-play").removeClass("icon-pause"),$(".disc").removeClass("active")},loadSingerSrc:function(t){return"assest/img/singer/"+t.singer+".png"},vol:{change:function(t){n.status&&(n.status[0].volume=t,$(".icon-mute").removeClass("icon-mute").addClass("icon-vol"))},slowUp:function(){n.status[0].volume=0;var t=$(".vc")[0].value,e=setInterval(function(){n.status[0].volume<Math.min(t,.95)?(n.status[0].volume+=.05,window.uping=!1):clearInterval(e)},60)},slowDown:function(t){var e=setInterval(function(){.05<n.status[0].volume?n.status[0].volume-=.05:(clearInterval(e),t())},60)},toggle:function(){0!=n.status[0].volume?(n.status[0].volume=0,$(".icon-vol").removeClass("icon-vol").addClass("icon-mute")):(n.status[0].volume=$(".vc")[0].value,$(".icon-mute").removeClass("icon-mute").addClass("icon-vol"))}},showInterface:function(){$("#main").hide(),"audio"==n.type?$("#musicInterface").fadeIn():$("#videoInterface").fadeIn()},hideInterface:function(){"audio"==n.type?$("#musicInterface").fadeOut():$("#videoInterface").fadeOut(),$("#main").show()}};return n});
define("net",["ui"],function(r){var t={checkReg:function(e,n){for(var t in e){if(0==e[t].length)return 0;if(e[t].length<6||15<e[t].length)return 1}var i;switch(n=n||""){case"remix":i=/[^A-Za-z0-9_\-\u4e00-\u9fa5]+/g;break;default:i=/\W+/g}return i.test(e.username)},sign:function(e,n){e.type="sign",t.post(e,"注册成功",n)},login:function(e,n){e.type="login",t.post(e,"登录成功",n)},post:function(n,t,i){$.post("page/main/main.php",n,function(e){e==t?($(".behind p").text(t),r.LS.preserve(function(){r.LS.hide(),$(".user_name").text(n.username)})):r.showAlert(e,i)},"text")},checkLogin:function(){return!1}};return t});
define("storage",function(){return{save:function(e,t){localStorage.setItem(e,t)},get:function(e){return localStorage.getItem(e)},delete:function(e){localStorage.removeItem(e)}}});
define("theme",["storage"],function(a){var r={init:function(){var e=a.get("theme")||"red";r.apply(e)},list:["red","purple","glass","star"],apply:function(e){var t,r="../../dist/css/"+(t="red"==e||"purple"==e?"light":"dark")+"/"+t+".css",s="../../dist/css/"+t+"/"+e+".css";$("#mode").attr("href",r),$("#theme").attr("href",s),a.save("theme",e)},change:function(e){r.apply(e)},Next:function(){var e=a.get("theme")||"red",t=r.list.findNext(e);r.apply(t)}};return r});
var api=require(["api"]),ui=require(["ui"],function(e){e.init(),e.flash.init(),e.flash.next(3e3),$("#header").on("mousedown",function(i){e.container.move(i)}),$("#LSmask *").click(function(){return!1}),$(".icon-full").click(e.full),$("#header").dblclick(e.full),$(".slideBar_item").click(function(){$(".slideBar_item.active,.page.active").removeClass("active"),$(this).addClass("active");var i=$(this).index();1==$(this).getParent(2).index()&&(i+=4);var e=$(".page").eq(i),t=e.attr("class").split(" ")[1].replace(/\w*-/g,"");console.log(t);var c="../../page/"+t+"/"+t+".html";e.load(c),e.addClass("active")}),$(".tab_item").click(function(){$(this).addClass("active"),$(this).siblings().removeClass("active");var i=$(this).index(),e=65+120*i,t=330*-i;$(".slider").animate({marginLeft:e}),$(".formGroup").animate({marginLeft:t})}),$("#LSmask").click(e.LS.hide),$(".segment a").click(function(){$(this).siblings().removeClass("active"),$(this).addClass("active")})}),media=require(["media"],function(t){$(".playGroup").on("click",".icon-play",function(){var i;t.status?t.continue():("audio"==t.type?(i=t.favoriteList[0],t.type="audio"):(i=t.mvList[0],t.type="video"),t.star(i))}),$(".playGroup").on("click",".icon-pause",function(){t.pause()}),$(".icon-next").click(function(){t.next()}),$(".icon-prev").click(function(){t.prev()}),$(".PM").click(function(){var i=$(this).attr("class").split(" ")[3].replace(/icon-/g,"");t.changePlayMode(i)}),$(".musicPic").click(function(){t.showInterface()}),$(".icon-back").click(function(){t.hideInterface()}),$(".progress").click(function(i){t.updateProgress(i)}),$(".vc").on("input propertychange",function(){var i=$(this)[0].value;t.vol.change(i)}),$(".icon-vol").click(function(){t.vol.toggle()}),$("table").on("click","tr",function(){t.type="audio";var i=$(this).index()-1,e=t.favoriteList[i];t.star(e)}),$(".mvList").on("click",".mv",function(){t.type="video";var i=$(this).index(),e=t.mvList[i];t.star(e)})}),net=require(["net","ui"],function(n,a){$(".user").click(function(){n.checkLogin()||a.LS.show()}),$(".sumbit").click(function(){var i=$(this),e=i.text();i.attr("disabled","true").text("提交中...");var t={username:i.siblings(".username").val(),password:i.siblings(".password").val()};function c(){i.removeAttr("disabled").text(e)}switch(n.checkReg(t)){case 0:a.showAlert("用户名及密码不能为空",c);break;case 1:a.showAlert("用户名及密码均需6-15位以内",c);break;case!0:a.showAlert("用户名需为字母数字组合",c);break;case!1:"注册"==e?n.sign(t,c):n.login(t,c)}})}),storage=require(["storage"]),theme=require(["theme"],function(i){i.init(),$(".icon-skin").click(function(){i.Next()})});define("driver/core",["api","ui","media","net","ui","storage","theme"],function(){});