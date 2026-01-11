import { boolean, pgTable, serial, varchar } from 'drizzle-orm/pg-core';
import { timestamps } from '../helpers/timestamps.js';

export const policies = pgTable('policies', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 30 }).notNull(),
  summary: varchar('content').notNull(),
  isActive: boolean('is_active').default(true),
  ...timestamps,
});
