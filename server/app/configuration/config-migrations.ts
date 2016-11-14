import * as Project from 'tts4t';

const SERVER: Project.Configuration.ServerConfig = {
  port: '3000',
  url: 'http://localhost:3000'
};

const DATABASE_WITH_PREVIOUS_SCHEME: string = 'tts4trivium-migrations-from-changelogs';

const DATABASE: Project.Configuration.DatabaseConfig = {
  name: 'tts4trivium-migrations-from-models',
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

// const SECURITY: Project.Configuration.SecurityConfig = {
//   secret: 'd6Fa152veJdSx8XjRcHu',
//   tokenExpirationIn: '10d' // https://github.com/rauchg/ms.js
// };


//noinspection TypeScriptValidateTypes
const LOG: Project.Configuration.LogConfig = {
  transports: [{
    type: 'console',
    level: 'silly'
  }]
};

export default <Project.Configuration.EnvConfig> {
  server: SERVER,
  database: DATABASE,
  temporaryDatabaseName: DATABASE_WITH_PREVIOUS_SCHEME,
  log: LOG
};