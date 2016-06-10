var gulp = require('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  util = require('gulp-util'),
  jscs = require('gulp-jscs'),
  replace = require('gulp-replace'),
  insert = require('gulp-insert'),
  exec = require('child_process').exec,
  fs = require('fs'),
  package = require('./package.json'),
  browserify = require('browserify'),
  streamify = require('gulp-streamify'),
  source = require('vinyl-source-stream'),
  merge = require('merge-stream'),
  plumber = require('gulp-plumber'),
  watch = require('gulp-watch');

var srcDir = './src/';
var outDir = './';

var header = "/*!\n\
 * HyperResponsiveCharts.js\n\
 * Version: {{ version }}\n\
 *\n\
 * Copyright 2016 BBC\n\
 * Released under the Apache 2.0 license\n\
 * https://github.com/bbc/news-vj-chartjs-plugin-hyper-responsiveness\n\
 */\n";

function buildTask() {
  var nonBundled = browserify('./src/hyper.responsive.charts.js')
    .ignore('Chart')
    .bundle()
    .pipe(source('Hyper.Responsive.Charts.js'))
    .pipe(insert.prepend(header))
    .pipe(streamify(replace('{{ version }}', package.version)))
    .pipe(gulp.dest(outDir))
    .pipe(streamify(uglify({
      preserveComments: 'some'
    })))
    .pipe(streamify(concat('Hyper.Responsive.Charts.min.js')))
    .pipe(gulp.dest(outDir));

  return nonBundled;
}

function jscsTask() {
  return gulp.src(srcDir + '**/*.js')
    .pipe(jscs({}))
    .pipe(jscs.reporter());
}

function watchTask() {
  return watch(srcDir + '**/*.js', function () {
	gulp.run('jscs')
	gulp.run('build')
  });
}

gulp.task('build', buildTask);
gulp.task('jscs', jscsTask);
gulp.task('watch', watchTask);
