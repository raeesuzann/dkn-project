import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

import config from '../config/index.js';
import { schema } from './schema/index.js';

const pool = new Pool({
  connectionString: config.databaseUrl,
});

async function connect() {
  try {
    await pool.connect();
    console.log('Successfully connected to database');
  } catch (error) {
    console.error('Error connecting to database:', error);
    process.exit(1);
  }
}

(async () => {
  await connect();
})();

export const db = drizzle(
  {
    client: pool,
  },
  { schema }
);
