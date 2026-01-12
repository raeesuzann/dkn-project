import {
  boolean,
  integer,
  numeric,
  pgTable,
  serial,
  varchar,
} from 'drizzle-orm/pg-core';
import { timestamps } from '../helpers/timestamps.js';
import { relations } from 'drizzle-orm';
import { users } from './users.js';

export const contents = pgTable('contents', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 30 }).notNull(),
  description: varchar('description').notNull(),
  metadata: varchar('metadata', { length: 20 }).notNull(),
  files: varchar('files'),
  localisation: varchar('localisation'),
  author: varchar('author').notNull(),
  version: numeric().notNull(),
  isVerified: boolean('is_verified').default(false),
  isNLPCheckPassed: boolean('is_nlp_check_passed').default(false),
  isRegional: boolean('is_regional').default(false),
  isGDPRChecked: boolean('is_gdpr_checked').default(false),
  isActive: boolean('is_active').default(true),
  userId: integer('user_id')
    .references(() => users.id)
    .notNull(),
  ...timestamps,
});

export const contentsRelations = relations(contents, ({ one }) => ({
  user: one(users, {
    fields: [contents.id],
    references: [users.id],
  }),
}));
