import bcrypt from 'bcrypt';
import { and, eq } from 'drizzle-orm';
import jwt from 'jsonwebtoken';

import config from '../config/index.js';
import { db } from '../db/index.js';
import { users } from '../db/schema/users.js';

import { roles } from '../db/schema/roles.js';
import { usersToRoles } from '../db/schema/users_roles.js';
import { getPasswordHash } from '../services/bcrypt/password-hash.js';
import { registerUser } from '../services/shared/user.service.js';
import { sendSetPasswordMail } from '../services/shared/email.service.js';

const signUp = async (req, res, next) => {
  const { email, username, contactNumber } = req.body;
  try {
    // if anyone has email or username or contactNumber
    const existingEmail = await db
      .select()
      .from(users)
      .where(eq(users.email, email));
    if (existingEmail.length) {
      res.status(400).json({
        success: false,
        message:
          'Email already registered. Please use other email or login using this email',
      });
      return;
    }

    const exisitingUsername = await db
      .select()
      .from(users)
      .where(eq(users.username, username));
    if (exisitingUsername.length) {
      res
        .status(400)
        .json({ success: false, message: 'Username already taken' });
      return;
    }

    // save user
    const newUser = await registerUser({
      email,
      username,
      contactNumber,
      role: Role.User,
    });

    res.status(200).json({
      data: newUser,
      message: 'Registration successfull',
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const [user] = await db
      .select({
        id: users.id,
        email: users.email,
        password: users.password,
        role: roles.name,
      })
      .from(users)
      .where(and(eq(users.email, email), eq(users.isActive, true)))
      .innerJoin(usersToRoles, eq(users.id, usersToRoles.userId))
      .innerJoin(roles, eq(usersToRoles.roleId, roles.id));

    if (!user || !user.password || !user.email) {
      res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
      return;
    }

    const passwordIsValid = await bcrypt.compare(password, user.password ?? '');

    if (!passwordIsValid) {
      res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
      return;
    }

    // get and add roles to token
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
      },
      config.jwtSecret,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      data: token,
      message: 'Login Successfull',
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

const setPassword = async (req, res, next) => {
  try {
    const { token, password } = req.body;
    const decoded = jwt.verify(token, config.jwtSecret);

    if (decoded.purpose !== 'set_password') throw new Error();

    const hashedPassword = await getPasswordHash(password);

    const [existingUser] = await db
      .select({ password: users.password, canReset: users.canReset })
      .from(users)
      .where(eq(users.id, decoded.userId));

    if (!existingUser.canReset) {
      if (existingUser.password) {
        res.status(400).json({
          success: false,
          message: 'User password has already been set',
        });
        return;
      }
    }

    await db
      .update(users)
      .set({ password: hashedPassword })
      .where(eq(users.id, decoded.userId));

    res
      .status(200)
      .json({ success: true, message: 'Password set successfully' });
  } catch (error) {
    next(error);
  }
};

const changePassword = async (req, res, next) => {
  const { currentPassword, newPassword } = req.body;
  const userId = req.user?.userId;
  try {
    if (userId) {
      const [user] = await db.select().from(users).where(eq(users.id, userId));

      const passwordIsValid = await bcrypt.compare(
        currentPassword,
        user.password ?? ''
      );

      if (passwordIsValid) {
        const hashedNewPassword = await getPasswordHash(newPassword);
        await db.update(users).set({ password: hashedNewPassword });
      } else {
        res
          .status(200)
          .json({ success: false, message: "Password doesn't match" });
        return;
      }

      res
        .status(200)
        .json({ success: true, message: 'Password changed successfully' });

      // compare it with user password hash if equals then update user password with new password
    }
  } catch (error) {
    next(error);
  }
};

const forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  try {
    const [foundUser] = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    if (!foundUser) {
      res.status(400).json({ success: true, message: 'Invalid User' });
      return;
    }

    await db
      .update(users)
      .set({ canReset: true, updatedAt: new Date() })
      .where(eq(users.email, foundUser.email));

    sendSetPasswordMail(foundUser);

    res.json({
      success: true,
      message: 'Password reset has been sent to your email.',
    });
  } catch (error) {
    next(error);
  }
};

const verifyToken = (req, res) => {
  res
    .status(200)
    .json({ message: 'Token is valid', success: true, data: req.user });
};

export {
  changePassword,
  forgotPassword,
  setPassword,
  login,
  signUp,
  verifyToken,
};
