import { relations } from 'drizzle-orm';
import { pgTable, serial, varchar } from 'drizzle-orm/pg-core';
import { usersToRoles } from './users_roles.js';

export const roles = pgTable('roles', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 50 }).notNull().unique(),
});

export const roleRelations = relations(roles, ({ many }) => ({
  usersToRoles: many(usersToRoles),
}));