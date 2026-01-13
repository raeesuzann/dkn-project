import { eq } from 'drizzle-orm';
import { db } from '../db/index.js';
import { users } from '../db/schema/users.js';
import { getPasswordHash } from '../services/bcrypt/password-hash.js';

export const getAllUserList = async (req, res, next) => {
  try {
    const userList = await db
      .select({
        id: users.id,
        email: users.email,
        username: users.username,
        contactNumber: users.contactNumber,
        isActive: users.isActive,
      })
      .from(users);

    console.log({ userList });

    res.status(200).json({
      data: userList,
      message: 'All user fetched successfully',
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const userDetails = await db.select().from(users).where(eq(users.id, +id));

    res.status(200).json({
      data: userDetails,
      message: 'User details successfully',
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

export const addUser = async (req, res, next) => {
  const newUserPayload = req.body;
  console.log(req.body)
  try {
    const hashedPassword = await getPasswordHash('Test@98765');

    const [newuser] = await db
      .insert(users)
      .values({
        ...newUserPayload,
        password: hashedPassword,
        isVerified: true,
      })
      .returning();

    res.status(201).json({
      data: newuser,
      message: 'User created successfully',
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

export const deactivateUser = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
