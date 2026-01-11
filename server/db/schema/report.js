import { boolean, pgTable, serial, varchar } from 'drizzle-orm/pg-core';
import { timestamps } from '../helpers/timestamps.js';

export const reports = pgTable('reports', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 30 }).notNull(),
  summary: varchar('summary').notNull(),
  isActive: boolean('is_active').default(true),
  ...timestamps,
});
