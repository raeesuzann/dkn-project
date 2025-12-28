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

  const [superadmin] = await tx
    .insert(users)
    .values({
      email: 'superadmin@yopmail.com',
      username: 'superadmin',
      password: hashedPassword,
      contactNumber: '1234567890',
    })
    .returning();

  await tx.insert(userProfile).values({
    dob: '1990-01-01',
    userId: superadmin.id,
  });

  const [superadminRole] = await tx
    .select()
    .from(roles)
    .where(eq(roles.name, 'superadmin'));

  if (!superadminRole) throw new Error('Superadmin role not found');

  await tx.insert(usersToRoles).values({
    userId: superadmin.id,
    roleId: superadminRole.id,
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
