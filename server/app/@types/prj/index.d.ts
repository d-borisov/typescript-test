declare module 'prj' {

  import * as express from 'express';
  import * as Sequelize from 'sequelize';

  namespace Project {

    interface Another {
      foo: string;
      bar: number;
    }

    interface Next extends express.NextFunction {
    }

    interface Response extends express.Response {
      local: {
        name: string;
      }
    }

    interface Request extends express.Request {
      local?: {
        user?: any;
      },
      some: string;
    }
  }

  namespace Configuration {

    interface GlobalSettings {
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

    interface SmsConfig {
      accountSid: string;
      authToken: string;
      phoneNumber: string;
    }

    interface MailConfig {
      secretKey: string;
    }

    interface RecaptchaConfig {
      id: string;
      secret: string;
    }

    interface RedisConfig {
      host: string;
      port: number;
    }

    interface DatabaseConfig {
      name: string;
      username: string;
      password: string;
      settings: Sequelize.Options;
    }

    type InfinMode = 'prod' | 'test';

    interface InfinFinanceConfig {
      mode: InfinMode;
      secretKey: string;
      serviceName?: string;
      apiKey?: string;
      url?: string;
    }

    interface PayPalFinanceConfig {
      paymentServerUrl: string;
      api: {
        mode?: string;
        host: string;
        client_id: string;
        client_secret: string;
      }
    }

    interface LemonwayFinanceConfig {
      wlLogin: string;
      wlPass: string;
      directKitWSDLFile: string;
      webkitUrl: string;
    }

    interface FinanceConfig {
      infin: InfinFinanceConfig;
      payPal: PayPalFinanceConfig;
      lemonway: LemonwayFinanceConfig;
    }

    interface CDNConfig {
      url: string;
      urlWithTimestamp?: string;
    }

    interface ServerConfig {
      port: string;
      url: string;
    }

    interface AWSConfig {
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

    type LogTransportType = 'console';

    // https://github.com/winstonjs/winston#logging-levels
    type LogLevelType = 'error' | 'warn' | 'info' | 'verbose' | 'debug' | 'silly';

    interface LogTransport {
      type: LogTransportType;
      level: LogLevelType;
    }

    interface LogConfig {
      transports: LogTransport[];
    }

    interface SiteVerificationConfig {
      name: string,
      value: string,
    }

    interface EnvConfig {
      server: ServerConfig;
      database: DatabaseConfig;
      temporaryDatabaseName?: string;
      log: LogConfig;
    }

    interface FullConfiguration {
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
    }
  }
}
