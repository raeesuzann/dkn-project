import * as usersSchema from './users.js';
import * as userRolesSchema from './users_roles.js';
import * as userProfilesSchema from './user_profile.js';
import * as rolesSchema from './roles.js';
import * as bookingsSchema from './bookings.js';
import * as paymentsSchema from './payments.js';
import * as testsSchema from './tests.js';

export const schema = {
  ...usersSchema,
  ...userRolesSchema,
  ...userProfilesSchema,
  ...rolesSchema,
  ...bookingsSchema,
  ...paymentsSchema,
  ...testsSchema,
};
