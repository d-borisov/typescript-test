import {
  Configuration
} from 'tts4t';

const SERVER: Configuration.ServerConfig = {
  port: '3000',
  url: 'http://localhost:3000'
};

const DATABASE_TO_VALIDATE_SCHEME: string = 'tts4trivium-migrations-from-models';

const DATABASE: Configuration.DatabaseConfig = {
  name: 'db_name',
  username: 'postgres',
  password: '1234',
  settings: {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',

    pool: {
      max: 3,
      min: 1,
      idle: 5000
    }
  }
};

const LOG: Configuration.LogConfig = {
  transports: [{
    type: 'console',
    level: 'silly'
  }]
};

export default <Configuration.EnvConfig> {
  server: SERVER,
  database: DATABASE,
  temporaryDatabaseName: DATABASE_TO_VALIDATE_SCHEME,
  log: LOG,
};