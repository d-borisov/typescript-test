'use strict';

var babel = require("gulp-babel");
var cache = require('gulp-cached');
var del = require('del');
var fs = require('fs');
var gulp = require('gulp');
var merge2 = require('merge2');
var runSequence = require('run-sequence');
var sourcemaps = require('gulp-sourcemaps');
var ts = require('gulp-typescript');

var conf = require('./conf');
var logger = conf.logger('build');
var prjDuration = require('./utils/prj-duration');

var tsconfig = require('../tsconfig.json');
var tsPaths = {
  app: conf.paths.src.app + '/**/*.ts',
  test: conf.paths.src.test + '/**/*.ts',
  bin: conf.paths.src.bin + '/**/*.ts',
  common: conf.paths.src.common + '/**/*.ts'
};

gulp.task('build:validate', function (done) {
  try {
    logger.info('Check that webapp files folder exists: ' + conf.paths.src.webapp);
    var stats = fs.lstatSync(conf.paths.src.webapp);

    if (stats.isDirectory()) {
      logger.info('Success! Folder exists');
      done();
    } else {
      logger.error('Folder [' + conf.paths.src.webapp + '] missed');
      done('Error');
    }
  } catch (err) {
    logger.error(err);
    done(err);
  }
});

gulp.task('build:clean', function (done) {
  return del([
    'app/**/*.js',
    'app/**/*.js.map',
    'test/**/*.js',
    'test/**/*.js.map',
    'bin/**/*.js',
    'bin/**/*.js.map',
    '../common/**/*.js',
    '../common/**/*.js.map',
    '!' + conf.paths.src.webapp + '/**/*',
  ], {force: true}, done);
});

gulp.task('build:compile', function () {
  var app = tsCompile(tsPaths.app);
  var test = tsCompile(tsPaths.test);
  var bin = tsCompile(tsPaths.bin);
  var common = tsCompile(tsPaths.common);

  return merge2([
    app.pipe(gulp.dest(conf.paths.src.app)),
    test.pipe(gulp.dest(conf.paths.src.test)),
    bin.pipe(gulp.dest(conf.paths.src.bin)),
    common.pipe(gulp.dest(conf.paths.src.common))
  ]);
});

gulp.task('build:clean-and-compile', function (done) {
  return runSequence('build:clean', 'build:compile', done);
});

gulp.task('build', function (done) {
  return runSequence('build:validate', 'build:clean', 'build:compile', done);
});

function tsCompile(path) {
  var durationLogger = prjDuration.logger(logger);
  var duration = prjDuration.start(durationLogger);
  var compilerOptions = tsconfig.compilerOptions;

  return gulp.src(path)
    .pipe(cache('tsCompile'))
    .pipe(duration.step('Cache generation for ' + path))
    .pipe(sourcemaps.init())
    .pipe(duration.step('Sourcemaps init for ' + path))
    .pipe(ts(compilerOptions))
    .pipe(duration.step('Compiling ' + path))
    .pipe(sourcemaps.write('.', {sourceRoot: ''}))
    .pipe(duration.step('Sourcemaps write for ' + path));
}
