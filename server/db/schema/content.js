import {
  boolean,
  numeric,
  pgTable,
  serial,
  varchar,
} from 'drizzle-orm/pg-core';
import { timestamps } from '../helpers/timestamps.js';

export const users = pgTable('contents', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 30 }).notNull(),
  description: numeric('contact_number').notNull(),
  files: varchar('files'),
  localisation: varchar('localisation'),
  isVerified: boolean('is_verified').default(false),
  isNLPCheckPassed: boolean('is_nlp_check_passed').default(false),
  isGDPRChecked: boolean('is_gdpr_checked').default(false),
  isActive: boolean('is_active').default(true),
  ...timestamps,
});
