import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';

import config from '../config/index.js';
import { schema } from './schema/index.js';

const client = new Client({
  user: config.dbUser,
  host: config.dbHost,
  database: config.dbName,
  password: config.dbPassword,
  port: config.dbPort,
});

async function connect() {
  try {
    await client.connect();
    console.log('Successfully connected to database');
  } catch (error) {
    console.error('Error connecting to database:', error);
    process.exit(1);
  }
}

(async () => {
  await connect();
})();

export const db = drizzle(client, { schema });
