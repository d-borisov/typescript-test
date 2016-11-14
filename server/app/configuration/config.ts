import {Configuration} from 'prj';
import {MODE} from './env';
import ConfigLocal from './config-local';
import ConfigTest from './config-test';

const config: Configuration.FullConfiguration = {
  env: function (): Configuration.EnvConfig {
    if (process.env.mode == null) {
      console.error('Error! process.env.mode not specified!');
      process.exit(1);
    }

    return config[process.env.mode];
  },
  isLocal: function (): boolean {
    return process.env.mode == MODE.local;
  },
  isTest: function (): boolean {
    return process.env.mode == MODE.test;
  },
  isMigrations: function (): boolean {
    return process.env.mode == MODE.migrations;
  },
  getMode: function () {
    return process.env.mode;
  },
  getTemplateFilePath: function (path: string): string {
    return __dirname + '/views/' + path;
  },
  DATE_FORMAT: 'YYYY-MM-DD',
  DATE_TIME_FORMAT: 'YYYY-MM-DD HH:mm:ss',
  test: ConfigTest,
  local: ConfigLocal
};

export default config;
