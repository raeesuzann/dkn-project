import { eq, inArray } from 'drizzle-orm';

import { getPasswordHash } from '../../services/bcrypt/password-hash.js';
import { db } from '../index.js';
import { roles } from '../schema/roles.js';
import { userProfile } from '../schema/user_profile.js';
import { users } from '../schema/users.js';
import { usersToRoles } from '../schema/users_roles.js';

async function seedRoles(tx) {
  const defaultRoles = ['user', 'admin', 'superadmin'];

  // Fetch roles already in DB
  const existingRoles = await tx
    .select()
    .from(roles)
    .where(inArray(roles.name, defaultRoles));

  const existingRoleNames = existingRoles.map((r) => r.name);

  // Filter roles that need to be inserted
  const rolesToInsert = defaultRoles.filter(
    (role) => !existingRoleNames.includes(role)
  );

  if (rolesToInsert.length > 0) {
    await tx.insert(roles).values(rolesToInsert.map((name) => ({ name })));
    console.log(`Inserted roles: ${rolesToInsert.join(', ')}`);
  } else {
    console.log('All roles already exist');
  }
}

async function seedUserWithRole(tx) {
  const hashedPassword = await getPasswordHash('Test@98765');

  const [systemadmin] = await tx
    .insert(users)
    .values({
      email: 'systemadmin@yopmail.com',
      username: 'systemadmin',
      password: hashedPassword,
      contactNumber: '123456789',
      isVerified: true,
    })
    .returning();

  await tx.insert(userProfile).values({
    name: 'systemadmin',
    dob: '1990-01-01',
    userId: systemadmin.id,
    address: 'London',
  });

  const [systemadminRole] = await tx
    .select()
    .from(roles)
    .where(eq(roles.name, 'superadmin'));

  if (!systemadminRole) throw new Error('System Admin role not found');

  await tx.insert(usersToRoles).values({
    userId: systemadmin.id,
    roleId: systemadminRole.id,
  });
}

async function seed() {
  return db
    .transaction(async (tx) => {
      await seedRoles(tx);
      await seedUserWithRole(tx);
    })
    .catch((err) => {
      console.log('Transaction rolled back: ', err);
      throw err;
    });
}

seed()
  .catch(console.error)
  .finally(() => process.exit());
