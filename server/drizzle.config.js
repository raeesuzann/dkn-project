import { defineConfig } from 'drizzle-kit';

import config from "./config/index.js"

export default defineConfig({
  dialect: 'postgresql',
  schema: './db/schema/*',
  out: './db/migrations',
  dbCredentials: {
    url: config.databaseUrl
  }
});
