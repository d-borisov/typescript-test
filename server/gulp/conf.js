'use strict';

var gutil = require('gulp-util');

exports.logger = _logger;

exports.paths = {
  src: {
    server: 'server',
    webapp: 'app/public',
    app: 'app',
    test: 'test',
    bin: 'bin',
    common: '../common'
  },
  awsCodeDeploy: 'aws-code-deploy',
  folderToContainBundleFiles: '.aws-distribution/files',
  folderToContainBundle: '.aws-distribution'
};

var EXTENSION_ZIP = 'zip';

exports.bundle = {
  paths: {
    awsCodeDeploy: '.',
    server: 'server'
  },
  constructRevisionName: _constructRevisionName,
  fileExt: '.' + EXTENSION_ZIP
};

exports.aws = {
  config: function () {
    return require('./secured/aws-deployer-credentials.json');
  },
  codeDeploy: {
    applicationName: 'Project',
    bucket: 'prj-code-deploy',
    revisionType: 'S3',
    bundleType: EXTENSION_ZIP,
    description: 'Project Application'
  }
};

function _constructRevisionName() {
  var logger = _logger('prj');
  var suffix = '';

  var args = require('yargs').argv;
  if (args.revisionNameSuffix != null) {
    suffix = args.revisionNameSuffix;
    logger.info('Suffix "' + suffix + '" is set from "--revisionNameSuffix" command line parameter');
  }
  if (process.env.REVISION_NAME_SUFFIX != null) {
    suffix = process.env.REVISION_NAME_SUFFIX;
    logger.info('Suffix "' + suffix + '" is set from "REVISION_NAME_SUFFIX" environment variable');
  }

  var invalidSymbols = /[^_-a-zA-Z0-9]/gi;
  if (suffix.match(invalidSymbols)) {
    var newSuffix = suffix.replace(invalidSymbols, '');
    logger.warning('Suffix "' + suffix + '" replaced with "' + newSuffix + '"');
    suffix = newSuffix;
  }

  return 'APP_' + (new Date()).getTime() + (suffix.length > 0 ? '_' + suffix : '') + '.' + EXTENSION_ZIP;
}

function _logger(title) {
  return {
    info: function () {
      var args = Array.prototype.slice.call(arguments);
      args = [].concat(gutil.colors.green('[' + title + ']')).concat(args);
      gutil.log.apply(gutil, args);
    },
    warning: function () {
      var args = Array.prototype.slice.call(arguments);
      args = [].concat(gutil.colors.blue('[' + title + ']')).concat(args);
      gutil.log.apply(gutil, args);
    },
    error: function () {
      var args = Array.prototype.slice.call(arguments);
      args = [].concat(gutil.colors.red('[' + title + ']')).concat(args);
      gutil.log.apply(gutil, args);
    }
  };
}