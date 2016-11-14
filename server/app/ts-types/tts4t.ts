import * as express from 'express';
import * as Sequelize from 'sequelize';

export interface Next extends express.NextFunction {
}

export interface Response extends express.Response {
}

export interface Request extends express.Request {
  local: {
    language: string;
    geoip: IGeoipData;
    user?: any;
    auth?: {
      username: string;
    },
  },
  some?: string;
  assertValid(): void;
}

export interface IGeoipData {
  ip: string;
  countryA2Code: string;
}

export interface Model<TInstance, TAttributes> extends Sequelize.Model<TInstance, TAttributes>, ClassMethods {
  addScope(name: string, scope: Sequelize.FindOptions | Function, options?: {override: boolean});
}

export interface ClassMethods {
  associate(models): void;
  addScopes?(models): void;
}

export interface IPageable<T> {
  limit: number;
  offset: number;
  searchString: string;
  filter: T;
}

export namespace Configuration {

  export interface GlobalSettings {
    maxChannels?: number;
    contentExpiryExtensionTimeInSeconds?: number;
    extendContentPrice?: number;
    contentExpiryTimeInSeconds?: number;
    contentPostPrice?: number;
    feedPostPrice?: number;
    videoPer200MBTickPrice?: number;
    euroToTicksRate?: number;
    adminCostFreeTicksPercent?: number;
    campaignFreeTicksPercent?: number;
    adminCostPercent?: number;
    campaignTicksPercent?: number;
    voucherInvalidChecksToBan?: number;
    voucherMaxCount?: number;
    registrationFreeTicks?: number;
  }

  export interface SmsConfig {
    accountSid: string;
    authToken: string;
    phoneNumber: string;
  }

  export interface MailConfig {
    secretKey: string;
  }

  export interface SecurityConfig {
    secret: string;
    tokenExpirationIn: string; // https://github.com/rauchg/ms.js
  }

  export interface RecaptchaConfig {
    id: string;
    secret: string;
  }

  export interface RedisConfig {
    host: string;
    port: number;
  }

  export interface DatabaseConfig {
    name: string;
    username: string;
    password: string;
    settings: Sequelize.Options;
  }

  export type InfinMode = 'prod' | 'test';

  export interface InfinFinanceConfig {
    mode: InfinMode;
    secretKey: string;
    serviceName?: string;
    apiKey?: string;
    url?: string;
  }

  export interface PayPalFinanceConfig {
    paymentServerUrl: string;
    api: {
      mode?: string;
      host: string;
      client_id: string;
      client_secret: string;
    }
  }

  export interface LemonwayFinanceConfig {
    wlLogin: string;
    wlPass: string;
    directKitWSDLFile: string;
    webkitUrl: string;
  }

  export interface FinanceConfig {
    infin: InfinFinanceConfig;
    payPal: PayPalFinanceConfig;
    lemonway: LemonwayFinanceConfig;
  }

  export interface CDNConfig {
    url: string;
    urlWithTimestamp?: string;
  }

  export interface ServerConfig {
    port: string;
    url: string;
  }

  export interface AWSConfig {
    s3: {
      url: string;
      bucket: string;
      cloudFront: string;
      nginx: string;
    },
    region: string;
    access_key_id: string;
    secret_access_key: string;
    transcoder: {
      pipeline: string;
      sqs: {
        url: string;
      },
      qualityForThumbnails: string;
      qualities: {
        G720P: {
          preset: string;
          bitrate: number;
          thumbnailExtension: string;
        },
        G360P16x9: {
          preset: string;
          bitrate: number;
          thumbnailExtension: string;
        }
      }
    }
  }

  export type LogTransportType = 'console';

  // https://github.com/winstonjs/winston#logging-levels
  export type LogLevelType = 'error' | 'warn' | 'info' | 'verbose' | 'debug' | 'silly';

  export interface LogTransport {
    type: LogTransportType;
    level: LogLevelType;
  }

  export interface LogConfig {
    transports: LogTransport[];
  }

  export interface SiteVerificationConfig {
    name: string,
    value: string,
  }

  export interface EnvConfig {
    server: ServerConfig;
    database: DatabaseConfig;
    temporaryDatabaseName?: string;
    log: LogConfig;
  }

  export interface FullConfiguration {
    env(): EnvConfig;
    isLocal(): boolean;
    isTest(): boolean;
    isMigrations(): boolean;
    getMode(): string;
    getTemplateFilePath(path: string): string;
    DATE_FORMAT: string;
    DATE_TIME_FORMAT: string;
    test: EnvConfig;
    local: EnvConfig;
    migrations: EnvConfig;
  }
}
