'use strict';

var gulp = require('gulp');
var conf = require('./conf');

var tsPaths = {
  app: conf.paths.src.app + '/**/*.ts',
  test: conf.paths.src.test + '/**/*.ts',
  bin: conf.paths.src.bin + '/**/*.ts'
};

gulp.task('watch', ['build:clean-and-compile'], function () {
  return gulp.watch([tsPaths.app, tsPaths.test, tsPaths.bin], ['build:compile']);
});
