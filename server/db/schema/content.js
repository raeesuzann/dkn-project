import {
  boolean,
  numeric,
  pgTable,
  serial,
  varchar,
} from 'drizzle-orm/pg-core';
import { timestamps } from '../helpers/timestamps.js';

export const contents = pgTable('contents', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 30 }).notNull(),
  description: varchar('description').notNull(),
  metdata: varchar('metadata', { length: 20 }).notNull(),
  files: varchar('files'),
  localisation: varchar('localisation'),
  author: varchar('author').notNull(),
  version: numeric().notNull(),
  isVerified: boolean('is_verified').default(false),
  isNLPCheckPassed: boolean('is_nlp_check_passed').default(false),
  isRegional: boolean('is_regional').default(false),
  isGDPRChecked: boolean('is_gdpr_checked').default(false),
  isActive: boolean('is_active').default(true),
  ...timestamps,
});
