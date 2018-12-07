var gulp = require('gulp'),
	babel=require('gulp-babel'),
    //cssmin = require('gulp-minify-css'),             //css压缩
    uglify = require('gulp-uglify'),               //js压缩          //图片的压缩
    //base64 = require('gulp-base64') ,               //- 把小图片转成base64字符串
    htmlmin = require('gulp-htmlmin') ,  
    imagemin = require('gulp-imagemin'),
    sass = require('gulp-sass');

// 压缩 js 文件
gulp.task('script', function() {
    // 1. 找到文件
    gulp.src('src/js/*.js')
    	.pipe(babel({ presets:['env'] }))
    // 2. 压缩文件
        .pipe(uglify({ mangle: false }))
    // 3. 另存压缩后的文件
        .pipe(gulp.dest('./dist/js/'));
});
//压缩html文件
gulp.task('html', function () {
    var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    gulp.src('./src/*.html')
        .pipe(htmlmin(options))
        .pipe(gulp.dest('./dist/'));
}); 
//图片
gulp.task('img', function() {
    gulp.src(['./src/img/**/*'])
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/img/'));
});
//scss文件
gulp.task('sass', function () {
  gulp.src('./src/sass/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('./src/css'));
});
//css
gulp.task('css', function () {
  gulp.src('./src/css/*.css')
    .pipe(gulp.dest('./dist/css/'));
});
/**
 * 静态资源
 */
gulp.task('static',  function() {
    return gulp.src('./src/static/**/*')
      .pipe(gulp.dest('./dist/static/'))
  });
gulp.task('watch', function() {
    //app
    gulp.watch(['./src/js/*.js'], ['script']);
    gulp.watch(['./src/*.html'], ['html']);
    gulp.watch(['./src/img/*.{png,gif,jpg}'], ['img']);
    gulp.watch(['./src/sass/*.scss'], ['sass']); 
    gulp.watch(['./src/css/*.css'], ['css']); 
    //静态资源
    gulp.watch(['./src/static/**/*'], ['static']); 
});
/* 合并上述我的方法 监控并执行任务 */
gulp.task('default',['script','html','img','sass','css','static','watch']);


