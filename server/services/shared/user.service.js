import { eq } from 'drizzle-orm';

import { db } from '../../db/index.js';
import { roles } from '../../db/schema/roles.js';
import { users } from '../../db/schema/users.js';
import { usersToRoles } from '../../db/schema/users_roles.js';

import { sendSetPasswordMail } from './email.service.js';

export const registerUser = async ({
  email,
  username,
  contactNumber,
  role = "User",
}) => {
  return await db.transaction(async (tx) => {
    const [newUser] = await tx
      .insert(users)
      .values({
        email,
        username,
        contactNumber,
      })
      .returning();

    // assign role
    const [foundRole] = await tx
      .select()
      .from(roles)
      .where(eq(roles.name, role));

    if (!foundRole)
      throw new Error("Can't assign role. Please contact operator");

    await tx
      .insert(usersToRoles)
      .values({
        userId: newUser.id,
        roleId: foundRole.id,
      })
      .returning();

    sendSetPasswordMail(newUser);

    return newUser;
  });
};