import {
  Configuration
} from 'prj';

const SERVER: Configuration.ServerConfig = {
  port: '3000',
  url: 'http://localhost:3000'
};

const DATABASE: Configuration.DatabaseConfig = {
  name: 'db_name_test',
  username: 'postgres',
  password: '1234',
  settings: {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',

    pool: {
      max: 6,
      min: 1,
      idle: 5000
    }

  }
};

const LOG: Configuration.LogConfig = {
  transports: [
     {
       type: 'console',
       level: 'silly'
     }
  ]
};


export default <Configuration.EnvConfig> {
  server: SERVER,
  database: DATABASE,
  log: LOG,
};