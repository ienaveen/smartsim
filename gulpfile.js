'use strict';

var gulp = require('gulp'),
    concat = require('gulp-concat'),
	sass = require('gulp-sass'),
	order = require('gulp-order'),
    runSequence = require('run-sequence');

gulp.task('scripts', function () {
    return gulp
			.src([
				"./public/js/directives/*.js",
				// "./public/js/global.js",
				// "./public/js/app-c.js",
				// "./public/js/cdps.js",
				// "./public/js/ui_health.js",
				// "./public/js/ui_analytics.js"
				"./public/js/main.js",
				"./public/js/tabs.js",
				"./public/js/*.js"
			])
			.pipe(concat("output.js"))
			.pipe(gulp.dest("./public/dist/"));
});

gulp.task('sass', function () {
    return gulp.src('./public/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./public/dist/'));
});

/**
 * default task
 */
gulp.task("default", function () {
    runSequence('scripts', 'sass');
});
