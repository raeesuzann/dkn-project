import * as usersSchema from './users.js';
import * as userRolesSchema from './users_roles.js';
import * as userProfilesSchema from './user_profile.js';
import * as rolesSchema from './roles.js';
import * as contentsSchema from './content.js';
import * as policiesSchema from './policy.js';
import * as reportsSchema from './report.js';

export const schema = {
  ...usersSchema,
  ...userRolesSchema,
  ...userProfilesSchema,
  ...rolesSchema,
  ...contentsSchema,
  ...policiesSchema,
  ...reportsSchema,
};
