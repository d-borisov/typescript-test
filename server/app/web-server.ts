const logger = require('./logger/logger').getLogger(__filename);

import 'reflect-metadata';
import * as path from 'path';
import * as express from 'express';
import {useExpressServer} from 'routing-controllers';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import MorganLogger from './logger/morgan-logger';

export default class WebServer {

  private static BASE_DIR: string = __dirname;

  private static someLogic(): Promise<string> {
    return new Promise<string>(resolve => {
      setTimeout(() => resolve('Hello world!'), 3000);
    })
  }

  public static async some(): Promise<void> {
    const result: string =  await WebServer.someLogic();
    logger.info(`We have result: ${result}`);
  }

  public static createWebServer(): express.Express {
    const expressApp: any = express();

    expressApp.use(compression());
    expressApp.use(MorganLogger);
    expressApp.use('/public', express.static(__dirname + '/public', {
      setHeaders: function (res: express.Response, path) {
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Cache-Control', 'public,s-max-age=31536000,max-age=86400')
      }
    }));
    expressApp.use(cors());
    expressApp.use(bodyParser.json());
    expressApp.use(bodyParser.urlencoded({extended: false}));
    expressApp.use(cookieParser());

    const server: express.Express = useExpressServer(expressApp, {
      controllerDirs: [path.join(WebServer.BASE_DIR, 'controllers', '*.js')],
      middlewareDirs: [path.join(WebServer.BASE_DIR, 'middlewares', '*.js')],
      defaultErrorHandler: true,
    });

    server.listen(3001);

    return server;
  }
}
