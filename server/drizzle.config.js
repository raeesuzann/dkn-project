import { defineConfig } from 'drizzle-kit';

import config from './src/config/config.js';

export default defineConfig({
  dialect: 'postgresql',
  schema: './db/schema/*',
  out: './db/migrations',
  dbCredentials: {
    host: config.dbHost,
    database: config.dbName,
    password: config.dbPassword,
    port: config.dbPort,
    user: config.dbUser,
    ssl: false,
  },
});
