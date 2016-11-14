const httpLogger = require('./logger').getLogger('http');

import morgan = require('morgan');

class MorganLogger implements morgan.StreamOptions {

  // morgan passes newline to a stream. so let's cut it.
  //
  // http://stackoverflow.com/questions/14572413
  // https://github.com/expressjs/morgan/issues/70
  public write(str: string): void {
    const withoutEmptyCharacters: string = str.replace(/^\s+|\s+$/g, '');
    httpLogger.info(withoutEmptyCharacters);
  }
}

const MORGAN_LOG_FORMAT: string =
  ' :req[x-forwarded-for]' +
  ' :remote-addr -' +
  ' :remote-user' +
  ' [:date[clf]]' +
  ' ":method :url HTTP/:http-version"' +
  ' :status' +
  ' :res[content-length]' +
  ' ":referrer"' +
  ' ":user-agent" -' +
  ' :response-time ms';

const MORGAN_OPTIONS: morgan.Options = {
  stream: new MorganLogger()
};

export default morgan(MORGAN_LOG_FORMAT, MORGAN_OPTIONS);