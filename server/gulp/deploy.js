'use strict';

var gulp = require('gulp');
//var AWS = require('aws-sdk');
var conf = require('./conf');
var fs = require('fs');
var path = require('path');
var logger = conf.logger('deploy');

gulp.task('deploy', function (done) {

  logger.info('Trying to detect bundle file in folder: ' + conf.paths.folderToContainBundle);
  detectPreparedBundleFile(conf.paths.folderToContainBundle, function (err, bundleFileName) {
    if (err != null) {
      logger.error(err);
      return done(err);
    }

    var bundleFile = conf.paths.folderToContainBundle + '/' + bundleFileName;
    logger.info('Success! Trying to work with bundle file: ' + bundleFile);
    fs.readFile(bundleFile, function (err, data) {
      if (err != null) {
        logger.error(err);
        return done(err);
      }

      logger.info('Success! Possible to work with this file');
      uploadAndRegister(bundleFileName, data, function (err) {
        if (err != null) {
          done(err);
        } else {
          done();
        }
      });
    });
  });
});

//function uploadAndRegister(bundleFileName, fileData, callback) {
//
//  AWS.config.update(conf.aws.config());
//  var s3 = new AWS.S3({apiVersion: '2006-03-01'});
//  var codeDeploy = new AWS.CodeDeploy({apiVersion: '2014-10-06'});
//
//  var s3Params = {
//    Bucket: conf.aws.codeDeploy.bucket,
//    Key: bundleFileName,
//    Body: fileData
//  };
//
//  logger.info('Starting to upload revision [' + bundleFileName + '] to S3 bucket "' + conf.aws.codeDeploy.bucket + '"');
//  s3.putObject(s3Params, function (err, data) {
//    if (err != null) {
//      logger.error(err);
//      return callback(err);
//    }
//
//    logger.info('Success! Revision uploaded');
//    var codeDeployParams = {
//      applicationName: conf.aws.codeDeploy.applicationName,
//      revision: {
//        revisionType: conf.aws.codeDeploy.revisionType,
//        s3Location: {
//          bucket: conf.aws.codeDeploy.bucket,
//          bundleType: conf.aws.codeDeploy.bundleType,
//          eTag: data.ETag,
//          key: bundleFileName
//        }
//      },
//      description: conf.aws.codeDeploy.description
//    };
//
//    logger.info('Starting to register revision [' + bundleFileName + '] to CodeDeploy "' + conf.aws.codeDeploy.applicationName + '"');
//    codeDeploy.registerApplicationRevision(codeDeployParams, function (err) {
//      if (err != null) {
//        logger.error(err.stack);
//        return callback(err);
//      }
//
//      logger.info('Success! Revision registered');
//      callback();
//    });
//
//  });
//}

function detectPreparedBundleFile(folderToContainBundle, callback) {

  var exists = fs.existsSync(folderToContainBundle);
  if (!exists) {
    callback('Error! Folder to contain bundle does not exist: ' + folderToContainBundle, null);
    return;
  }

  var insideDir = [];
  var zipFilesNames = [];
  fs.readdirSync(folderToContainBundle).forEach(function (file) {
    var stat = fs.statSync(folderToContainBundle + '/' + file);
    if ((stat != null) && (stat.isFile()) && (path.extname(file) == conf.bundle.fileExt)) {
      zipFilesNames.push(file);
    }
    insideDir.push(file);
  });

  if (zipFilesNames.length == 1) {
    callback(null, zipFilesNames[0]);
    return;
  }

  if (zipFilesNames.length == 0) {
    callback('Error! Folder "' + folderToContainBundle
      + '" does not contain any file with extension "' + conf.bundle.fileExt
      + '". List of entries inside: ' + insideDir.join(', ')
    );
    return;
  }

  callback('Error! Folder "' + folderToContainBundle
    + '" contains more than one file with extension "' + conf.bundle.fileExt
    + '". List of files: ' + zipFilesNames.join(', ')
  );
}
