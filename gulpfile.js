// 'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var concatCss = require('gulp-concat-css');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var minify = require('gulp-minify');
var minifyCss = require('gulp-minify-css');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

sass.compiler = require('node-sass');
// 1. gulp sass
gulp.task('sass', function () {
  gulp.src([
  	'./sass/layout.css',
  	'./sass/color.css'
  	])
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});
gulp.task('sass:watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
});

// 2.start browser-sync
gulp.task('serve', function() {
  browserSync({
    server: {
      baseDir: './'
    }
  });
  // gulp.watch("./sass/*.scss", ['sass']); // error
  gulp.watch("./*.html").on('change', browserSync.reload);
});
//error
//Compile sass into CSS & auto-inject into browsers
// gulp.task('sass', function() {
//     return gulp.src("./sass/*.scss")
//         .pipe(sass())
//         .pipe(gulp.dest("./css"))
//         .pipe(browserSync.stream());
// });

// gulp.task('default', ['serve']);

//3. minify
gulp.task('compress', function() {
  //cấu hình minify js
  gulp.src('./js/*.js') //đường dẫn đến thư mục chứa các file js
    .pipe(minify({
        exclude: ['tasks'],
        ignoreFiles: ['-min.js'] //những file không muốn nén
    }))
    .pipe(gulp.dest('dist/js')); //thư mục dùng để chứa các file js sau khi nén
  //cấu hình minify css
  gulp.src('./css/*.css') //đường dẫn đến thư mục chứa các file css
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/css')); //thư mục dùng để chứa các file css sau khi nén
  //cấu hình minify image
  gulp.src('./img/*') //đường dẫn đến thư mục chứa các file images
    .pipe(imagemin({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngquant()]
    }))
    .pipe(gulp.dest('./img')); //thư mục dùng để chứa các file images sau khi nén
});
