import * as logger from '../logger/logger';
import * as winston from 'winston';
import * as config from '../configuration/config';

export default class BaseController {
  protected logger: winston.LoggerInstance;
  protected config = config;

  constructor(filename: string) {
    this.logger = logger.getLogger(filename);
  }

}