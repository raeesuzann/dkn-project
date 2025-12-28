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
  dob: date('date_of_birth').notNull(),
  profilePic: text('profile_pic'),
  country: varchar('country', { length: 50 }),
  postalAddress: varchar('postal_address', { length: 50 }),
  town: varchar('town', { length: 50 }),
  zipCode: varchar('zip_code', { length: 10 }),

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