/* File: gulpfile.js */

'use strict';

var gulp     = require('gulp');
var install  = require('gulp-install');
var sass     = require('gulp-sass');
var jshint   = require('gulp-jshint');
var minify   = require('gulp-minify');
var cleanCSS = require('gulp-clean-css');
var del      = require('del');

/**************************************************************************************************
   INSTALL
**************************************************************************************************/

gulp.task('install', function () {
    gulp.src(['./bower.json', './package.json'])
    .pipe(install());
});

/**************************************************************************************************
   SASS
**************************************************************************************************/

gulp.task('sass', function () {
    gulp.src('src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('src/css'));
});

gulp.task('sass:watch', ['sass'], function () {
    gulp.watch('src/scss**/*.scss', ['sass']);
});

/**************************************************************************************************
   LINTER
**************************************************************************************************/

gulp.task('js-lint', function() {
    gulp.src('src/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});

/**************************************************************************************************
   UGLFY
   Minify and copy all JavaScript/CSS for distribution
**************************************************************************************************/

gulp.task('minify-js', ['clean'], function() {
    gulp.src('src/*.js')
    .pipe(minify({
        ext:{
            src:'.js',
            min:'.min.js'
        },
    }))
    .pipe(gulp.dest('dist'))
});

gulp.task('minify-css', ['clean'], function() {
    gulp.src('src/css/*.css')
    .pipe(gulp.dest('dist'));
});

/**************************************************************************************************
   CLEAN
**************************************************************************************************/

gulp.task('clean', function () {
    del.sync(['dist']);
});


/**************************************************************************************************
   BUILD
**************************************************************************************************/

gulp.task('build', ['pre-build'], function () {
    gulp.start('minify-js', 'minify-css');
});

gulp.task('pre-build', ['js-lint'], function () {});
