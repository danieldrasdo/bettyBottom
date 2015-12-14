// Include gulp and plugins
var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    prefix = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    plumber = require('gulp-plumber'),
    browserSync = require('browser-sync').create();

// Lint Task
gulp.task('lint', function() {
  return gulp.src('_src/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

//Autoprefix CSS
gulp.task('prefix', function() {
    return prefix({
      browsers: ['last 2 versions'],
      cascade: false
    });
});

// Compile Our Sass
gulp.task('sass', function() {
  return gulp.src('_src/sass/*.sass')
    .pipe(plumber())
    .pipe(sass({
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(prefix())
    .pipe(gulp.dest('assets/css'))
    .pipe(browserSync.stream());
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
  return gulp.src('_src/js/*.js')
    .pipe(concat('functions.js'))
    .pipe(gulp.dest('assets/js'))
    .pipe(rename('functions.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('assets/js'))
    .pipe(browserSync.stream());
});

// BrowserSync
gulp.task('serve', ['sass'], function() {
  browserSync.init({
    server: "./"
  });
});

// Watch Files For Changes
gulp.task('watch', function() {
  gulp.watch('_src/js/*.js', ['lint', 'scripts']);
  gulp.watch('_src/sass/*.sass', ['sass']);
  gulp.watch("./*.html").on('change', browserSync.reload);
});

// Default Task
gulp.task('default', ['lint', 'sass', 'prefix', 'scripts', 'serve', 'watch']);
