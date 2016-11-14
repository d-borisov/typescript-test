import * as winston from 'winston';
import * as config from '../configuration/config';
import * as logger from '../logger/logger';

export default class BaseMiddleware {
  protected logger: winston.LoggerInstance;
  protected config = config;

  constructor(filename: string) {
    this.logger = logger.getLogger(filename);
  }

}