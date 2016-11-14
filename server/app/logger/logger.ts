import * as winston from 'winston';
import * as fs from 'fs';
import * as path from 'path';
import * as util from 'util';
import * as Project from 'tts4t';
import config from '../configuration/config';

export function getLogger(label: string): winston.LoggerInstance {
  try {
    if (fs.statSync(label).isFile()) {
      label = path.basename(label).replace(new RegExp('\.js$', 'gi'), '.ts');
    }
  } catch (_) {
  }

  const transports: winston.TransportInstance[] = [];
  config.env().log.transports.forEach(t => {
    switch (t.type) {

      case 'console':
        transports.push(consoleTransport(label, t.level));
        return;

      default:
        return;
    }
  });

  return new (winston.Logger)({
    transports: transports
  });
}

function consoleTransport(label: string, level: Project.Configuration.LogLevelType): winston.ConsoleTransportInstance {
  return new (winston.transports.Console)({
    label: label,
    level: level,
    colorize: true,
    timestamp: function () {
      // return new DateTimeFormat().format('YYYY-MM-DD HH:mm:ss.SSS');
      return Date.now();
    },
    formatter: function (options) {
      const message: string = options.message != null
        ? options.message.replace(/\n+/g, '\\n').replace(/\t+/g, '\\t')
        : '';
      const meta: string = (options.meta != null) && (Object.keys(options.meta).length > 0)
        ? '\t' + util.inspect(options.meta)
        : '';

      return '[' + options.timestamp() + ']\t' +
        '[' + options.level + ']\t' +
        '[' + options.label + ']\t' +
        //'[' + requestId + ']\t' +
        message +
        meta;
    }
  });
}