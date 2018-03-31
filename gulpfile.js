var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var amdOptimize = require("amd-optimize"); 
var rjs = require('gulp-requirejs');
//编译scss
var path={
    page:'page/**/*.scss',
    component:'component/*.scss',
    theme:'theme/*.scss',
    module:'module/*.js',
    core:'driver/*.js',
    img:'assest/img/*/*.png',
};
var dist={
    css:'dist/css',
    js:'dist/js',
    img:'dist/img',
};

//页面scss
gulp.task('layout', function(){
    gulp.src([path.component,path.page])
        .pipe(concat('style.scss'))
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest(dist.css));
});

//主题scss
gulp.task('theme', function(){
    gulp.src(path.theme)
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest(dist.css));
});

//模块js
gulp.task("module",function(){
    gulp.src(path.module)
    .pipe(amdOptimize('driver/core', {
      findNestedDependencies: true,
      include: false,
    }))
    .pipe(uglify())
    .pipe(concat('module.js'))
    .pipe(gulp.dest(dist.js)); //输出目录 
});

gulp.watch([path.component,path.page], ['layout']);
gulp.watch(path.theme, ['theme']);
gulp.watch([path.module,path.core], ['module']);

gulp.task('default',['layout','theme','module']);

