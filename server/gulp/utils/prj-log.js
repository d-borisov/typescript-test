var through2 = require('through2');
var gutil = require('gulp-util');
var _ = require('lodash');

var PLUGIN_NAME = 'prj-log';

module.exports = function (logger, log) {
  var stream = through2.obj({
    objectMode: true
  });

  stream.on('end', function () {
    logger.info(gutil.colors.blue('[' + PLUGIN_NAME + ']'), log);
  });

  return stream;
};