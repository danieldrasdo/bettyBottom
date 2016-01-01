// Include gulp and plugins
var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    autoprefixer = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload;

//Log Errors
function errorLog(err) {
  console.error(err.message);
  this.emit('end');
}

//Scripts Task
gulp.task('scripts', function() {
  return gulp.src('_src/js/**/*.js')
    .pipe(concat('functions.js'))
    .on('error', errorLog)
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(gulp.dest('assets/js'))
    .pipe(rename('functions.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('assets/js'))

    .pipe(reload({stream:true}));
});

//Styles Task
gulp.task('styles', function() {
  gulp.src('_src/sass/**/*.+(sass|scss)')
    .pipe(sass({outputStyle: 'expanded'}))
    .on('error', errorLog)
    .pipe(autoprefixer({
      browsers: ['last 3 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('assets/css'))

    .pipe(reload({stream:true}));
});

//HTML Task
gulp.task('html', function() {
  gulp.src('./*.html')
    .pipe(reload({stream:true}));
});

// BrowserSync
gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: "./"
    },
    notify: false
  });
});

// Watch Files For Changes
gulp.task('watch', function() {
  gulp.watch('_src/js/**/*.js', ['scripts']);
  gulp.watch('_src/sass/**/*.+(sass|scss)', ['styles']);
  gulp.watch("./**/*.html", ['html']);
});

// Default Task
gulp.task('default', ['scripts', 'styles', 'html', 'browser-sync', 'watch']);
