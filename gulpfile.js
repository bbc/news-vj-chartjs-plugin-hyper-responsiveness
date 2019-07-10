'use strict';

const browserify = require('browserify');
const gulp = require('gulp');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const uglify = require('gulp-uglify');
const insert = require('gulp-insert');
const sourcemaps = require('gulp-sourcemaps');
const packageFile = require('./package.json');
const log = require('gulplog');

const header = "/*!\n\
 * HyperResponsiveCharts.js\n\
 * Version: {{ version }}\n\
 *\n\
 * Copyright 2016 BBC\n\
 * Released under the Apache 2.0 license\n\
 * https://github.com/bbc/news-vj-chartjs-plugin-hyper-responsiveness\n\
 */\n".replace("{{ version }}", packageFile.version);

const b = browserify({
  entries: './src/hyper.responsive.charts.js',
  debug: true
}).ignore('Chart');

gulp.task('buildRegular', function() {
  return b.bundle()
    .pipe(source('Hyper.Responsive.Charts.js'))
    .pipe(buffer())
    .pipe(insert.prepend(header))
    .pipe(gulp.dest('./'));
});

gulp.task('buildMinified', function() {
  return b.bundle()
    .pipe(source('Hyper.Responsive.Charts.min.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(insert.prepend(header))
    .pipe(gulp.dest('./'));
});

gulp.task('build', gulp.series('buildRegular', 'buildMinified'))
