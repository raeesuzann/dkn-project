import * as usersSchema from './users.js';
import * as userRolesSchema from './users_roles.js';
import * as userProfilesSchema from './user_profile.js';
import * as rolesSchema from './roles.js';

export const schema = {
  ...usersSchema,
  ...userRolesSchema,
  ...userProfilesSchema,
  ...rolesSchema,
};
