import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

import config from '../config/index.js';
import { schema } from './schema/index.js';

const pool = new Pool({
  connectionString: config.databaseUrl,
  max: 10, // max concurrent connections
  idleTimeoutMillis: 30000, // close idle clients after 30s
  connectionTimeoutMillis: 2000,
});

pool.on('error', (err) => {
  console.error('Unexpected PG error', err);
});

export const db = drizzle(pool, { schema });

console.log('Drizzle pool is ready. Successfully connected to database');
