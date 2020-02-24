/* jshint node: true */
'use strict';

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');
var gulpif = require('gulp-if');
var debug = getArg('--debug');
var autoprefixer  = require('gulp-autoprefixer');
var watch = require('gulp-watch');

var project = {
	js: __dirname + '/../Public/JavaScripts/',
	css: __dirname + '/../Public/CSS/',
};

gulp.task('js', function() {
	gulp.src([__dirname + '/JavaScripts/*.js'])
			.pipe(plumber())
			.pipe(concat('in2iframeconsent.js'))
			.pipe(gulpif(!debug, uglify()))
			.pipe(gulp.dest(project.js))
});

gulp.task('css', function() {
	gulp.src([__dirname + '/CSS/*.css'])
		.pipe(plumber())
		.pipe(concat('in2iframeconsent.css'))
		// .pipe(gulpif(!debug, uglify()))
		.pipe(gulp.dest(project.css))
});


gulp.task('build', ['js', 'css']);

/**
 * Get arguments from commandline
 */
function getArg(key) {
	var argClean = key.replace('--', '').toUpperCase();
	if (argClean in process.env) {
		return process.env[argClean];
	}
	var index = process.argv.indexOf(key);
	var next = process.argv[index + 1];
	return (index < 0) ? null : (!next || next[0] === '-') ? true : next;
}
