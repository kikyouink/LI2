var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var amdOptimize = require("amd-optimize"); 
var rjs = require('gulp-requirejs');
//编译scss
var path={
    sass:'page/**/*.scss',
    module:'module/*.js',
    img:'assest/img/*/*.png',
    core:'driver/*.js',
    theme:'theme/**/*.scss',
};
var dist={
    sass:'dist/css',
    module:'dist/js',
    img:'dist/img',
};
gulp.task('sass1', function(){
    gulp.src(path.sass)
        .pipe(concat('style.scss'))
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest(dist.sass));
});
gulp.task('sass2', function(){
    gulp.src(path.theme)
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest(dist.sass));
});
gulp.task("module",function(){
    gulp.src(path.module)
    .pipe(amdOptimize('driver/core', {
      findNestedDependencies: true,
      include: false,
    }))
    .pipe(uglify())
    .pipe(concat('module.js'))
    .pipe(gulp.dest(dist.module)); //输出目录 
});

gulp.watch(path.sass, ['sass1']);
gulp.watch(path.theme, ['sass2']);
gulp.watch([path.module,path.core], ['module']);

gulp.task('default',['sass1','sass2','module']);

