'use strict'

var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cssmin = require('gulp-cssmin')
var rename = require('gulp-rename');
var runSequence = require('run-sequence');
var inject = require('gulp-inject-string');
var clean = require('gulp-clean');
var process = require('process')

gulp.paths = {
  dist: 'dist/',
  src: 'src/',
  vendors: 'dist/vendors/'
};

var paths = gulp.paths;

require('require-dir')('./gulp-tasks');

// Static Server + watching scss/html files
gulp.task('serve', ['sass','removeIndexFile','addOwnScripts'], function() {

  browserSync.init({
      server: ['./', './src']
  });

  gulp.watch(paths.src + 'scss/**/*.scss', ['sass']);
  gulp.watch(paths.src + '**/*.html').on('change', browserSync.reload);
  gulp.watch(paths.src + 'js/**/*.js').on('change', browserSync.reload);
  gulp.watch(paths.src + '**/*.js').on('change', browserSync.reload);

});

// Static Server without watching scss files
gulp.task('serve:lite', function() {

  browserSync.init({
    server: ['./', './src']
  });

  gulp.watch(paths.src + '**/*.css').on('change', browserSync.reload);
  gulp.watch(paths.src + '**/*.html').on('change', browserSync.reload);
  gulp.watch(paths.src + 'js/**/*.js').on('change', browserSync.reload);
  gulp.watch(paths.src + '**/*.js').on('change', browserSync.reload);

});

gulp.task('serve:dist', function() {
  browserSync.init({
    server: ['./dist']
  });
});

gulp.task('sass', ['compile-vendors'], function() {
  return gulp.src(paths.src + '/scss/style.scss')
  .pipe(sass())
  .pipe(autoprefixer())
  .pipe(gulp.dest(paths.src + 'css'))
  .pipe(cssmin())
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest(paths.src + 'css'))
  .pipe(browserSync.stream());
});

gulp.task('sass:watch', function() {
  gulp.watch(paths.src + 'scss/**/*.scss', ['sass']);
});

gulp.task('removeIndexFile', function () {
        return gulp.src('./src/index.html', {read: false})
            .pipe(clean());
});

gulp.task('addOwnScripts', function(){
        var serverAddress = process.env.SERVER_ADDRESS
        var str = '<script type="text/javascript">var serverAddress="'+serverAddress+'"</script>\n'
        console.log(serverAddress)
        gulp.src('./test/index.html')
            .pipe(inject.before('</head>', str))
            .pipe(gulp.dest('./src'));
        console.log('myscript.js injected');
});

gulp.task('default', ['serve']);
