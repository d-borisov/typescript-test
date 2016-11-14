import * as env from '../app/configuration/env';
env.throwExceptionIfInvalidEnv();

const logger = require('../app/logger/logger').getLogger('www');
import WebServer from '../app/web-server';

WebServer.some()
  .then(() => {
    const server = WebServer.createWebServer();
    logger.info('Express web server started');
  })
  .catch(err => {
    logger.error(`We have error: ${err}`);
    process.exit(1);
  });
