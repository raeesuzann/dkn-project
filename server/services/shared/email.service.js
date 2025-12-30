import jwt from 'jsonwebtoken';

import config from '../../config/index.js';

export const sendSetPasswordMail = (newUser) => {
  // send password email
  const emailToken = jwt.sign(
    { userId: newUser.id, purpose: 'set_password' },
    config.jwtSecret,
    { expiresIn: '15m' }
  );

  const url = `${config.frontendUrl}/set-password?token=${emailToken}`;

  const message =
    'Please use the following link to reset your password. This link will allow you to reset a password for your account.\n\nThank you!';

  const mailOptions = {
    from: 'support@dknsystem.com',
    to: newUser.email,
    // bcc: config.emailHost,
    subject: config.appName,
    text: url ? `${message}\n\n${url}` : message,
    html: `
    <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
        <p>Hello ${newUser.username},</p>
        <p>${message}</p>
        ${
          url &&
          `
              <p>
                <a 
                  href="${url}" 
                  target="_blank" 
                  style="display: inline-block; padding: 10px 20px; font-size: 14px; color: #fff; background-color: #E10512; text-decoration: none; border-radius: 5px;"
                >
                  Click here
                </a>
              </p>
            `
        }
        <p>Thank you!</p>
      </div>
    `,
  };

  //   transporter.sendMail(mailOptions, async () => {
  //     await db
  //       .update(users)
  //       .set({ isEmailSent: true })
  //       .where(eq(users.id, newUser.id));
  //   });
};
