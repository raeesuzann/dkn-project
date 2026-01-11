import {
  date,
  integer,
  pgTable,
  serial,
  text,
  varchar,
} from 'drizzle-orm/pg-core';
import { timestamps } from '../helpers/timestamps.js';
import { users } from './users.js';
import { relations } from 'drizzle-orm';

export const userProfile = pgTable('user_profile', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 40 }).notNull(),
  dob: date('date_of_birth').notNull(),
  address: varchar('address').notNull(),

  userId: integer('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' })
    .unique(),
  ...timestamps,
});

export const userProfileRelations = relations(userProfile, ({ one }) => ({
  user: one(users, {
    fields: [userProfile.userId],
    references: [users.id],
  }),
}));
