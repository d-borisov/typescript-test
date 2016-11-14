'use strict';

var gulp = require('gulp');
var conf = require('./conf');
var del = require('del');
var merge2 = require('merge2');
var runSequence = require('run-sequence');
var zip = require('gulp-zip');

var prjLog = require('./utils/prj-log');
var logger = conf.logger('bundle');

gulp.task('bundle:clean', function (done) {
  return del([conf.paths.folderToContainBundleFiles + '/**/*'], {force: true}, done);
});

gulp.task('bundle:copy', ['bundle:clean'], function () {
  return merge2([
    gulp.src([
      'package.json'
    ]).pipe(gulp.dest(conf.paths.folderToContainBundleFiles + '/' + conf.bundle.paths.server)),

    gulp.src([
      conf.paths.src.app + '/**/*',
      '!**/*.ts',
      '!**/*.map',
      '!' + conf.paths.src.app + '/typings/**/*'
    ]).pipe(gulp.dest(conf.paths.folderToContainBundleFiles + '/' + conf.bundle.paths.server + '/' + conf.paths.src.app)),

    gulp.src([
      conf.paths.src.bin + '/**/*',
      '!**/*.ts',
      '!**/*.map'
    ]).pipe(gulp.dest(conf.paths.folderToContainBundleFiles + '/' + conf.bundle.paths.server + '/' + conf.paths.src.bin)),

    gulp.src([
      conf.paths.src.cli + '/**/*',
      '!**/*.ts',
      '!**/*.map'
    ]).pipe(gulp.dest(conf.paths.folderToContainBundleFiles + '/' + conf.bundle.paths.server + '/' + conf.paths.src.cli)),

    gulp.src([
      conf.paths.awsCodeDeploy + '/**/*'
    ]).pipe(gulp.dest(conf.paths.folderToContainBundleFiles + '/' + conf.bundle.paths.awsCodeDeploy))
  ]);
});

gulp.task('bundle:zip:clean', function (done) {
  return del([conf.paths.folderToContainBundle + '/*.zip'], {force: true}, done);
});

gulp.task('bundle:zip', ['bundle:zip:clean'], function () {
  var bundleFilename = conf.bundle.constructRevisionName();
  return gulp.src(conf.paths.folderToContainBundleFiles + '/**/*')
    .pipe(zip(bundleFilename))
    .pipe(gulp.dest(conf.paths.folderToContainBundle))
    .pipe(prjLog(logger, 'Zip file created: ' + bundleFilename))
  ;
});

gulp.task('bundle', function (done) {
  return runSequence('build', 'bundle:copy', 'bundle:zip', done);
});
