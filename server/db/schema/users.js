import { relations } from 'drizzle-orm';
import {
  boolean,
  numeric,
  pgTable,
  serial,
  varchar,
} from 'drizzle-orm/pg-core';
import { timestamps } from '../helpers/timestamps.js';
import { userProfile } from './user_profile.js';
import { usersToRoles } from './users_roles.js';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 40 }).notNull().unique(),
  username: varchar('username', { length: 30 }).notNull(),
  password: varchar('password', { length: 100 }),
  contactNumber: numeric('contact_number').notNull(),
  isVerified: boolean('is_verified').default(false),
  isEmailSent: boolean('is_email_sent'),
  canReset: boolean('can_reset').default(false),
  isActive: boolean('is_active').default(true),
  ...timestamps,
});

export const userRelations = relations(users, ({ one, many }) => ({
  usersToRoles: many(usersToRoles),
  profile: one(userProfile),
}));