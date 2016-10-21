/**
 * @fileOverview gulp file
 * @name gulpfile.js
 * @author Young Lee <youngleemails@gmail.com>
 * @license MIT
 */
'use strict';

var path = require('path');
var gulp = require('gulp');
var watch = require('gulp-watch');
var less = require('gulp-less');
var postcss = require('gulp-postcss');
var cleanCSS = require('gulp-clean-css');
var debug = require('gulp-debug');
var sourcemaps = require('gulp-sourcemaps');
var cssnext = require('postcss-cssnext');
var contrast = require('level4');
var rucksack = require('gulp-rucksack');
var level4 = require('level4');
var postcss_utils = require('postcss-utilities');
var will_change = require('postcss-will-change');

gulp.task('style', function () {
    return gulp.src(path.join(__dirname, 'less/*.less'))
		.pipe(less())
		.pipe(debug({ title: 'less2postcss' }))
		.pipe(sourcemaps.init())
		.pipe(cleanCSS({
			compatibility: 'ie8',
			keepBreaks: true,
			rebase: false,
			debug: true
		}))
		.pipe(postcss([
			cssnext({ browsers: ['last 3 versions'] }),
			postcss_utils(),
			level4(),
			will_change()
		]))
		.pipe(rucksack())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(path.join(__dirname, 'css')))
		.pipe(debug({ title: 'postcss2css' }));
});

gulp.task('watch', function() {
    gulp.watch(['./less/**/*'], ['style']);
});

gulp.task('default', ['style']);
