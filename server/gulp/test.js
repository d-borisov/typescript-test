'use strict';

var gulp = require('gulp');
var mocha = require('gulp-mocha');
var gutil = require('gulp-util');

var conf = require('./conf');
var processMode = require('./utils/prj-process-env-mode');

var logger = conf.logger('test');

gulp.task('test', function () {
  logDeprecation();

  var procMode;
  return gulp.src([conf.paths.src.test + '/**/*.js'])
    .pipe(procMode = processMode('test', logger))
    .pipe(mocha({reporter: 'list', timeout: 5000}))
    .pipe(procMode.restore());
});

/**
 * ATTENTION!
 * Gulp 'test' task deprecated because of problems with 'gulp-mocha' plugin.
 *
 * It can be that gulp process hangs.
 *   https://github.com/sindresorhus/gulp-mocha/issues/28
 *   https://github.com/sindresorhus/gulp-mocha/issues/54
 *   https://github.com/sindresorhus/gulp-mocha/issues/118
 *   https://github.com/sindresorhus/gulp-mocha/pull/31
 *   https://github.com/Strider-CD/strider/issues/949
 */
function logDeprecation() {
  logger.error(gutil.colors.red('WARNING!!! "gulp test" deprecated. See comment'));
}