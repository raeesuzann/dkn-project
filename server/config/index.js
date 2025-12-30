import dotenv from 'dotenv';

const envFile =
  process.env.NODE_ENV === 'production' ? '.env.production' : '.env';

dotenv.config({ path: envFile });

const config = {
  appName: process.env.APP_NAME ?? null,
  port: Number(process.env.PORT) || 5000,
  nodeEnv: process.env.NODE_ENV ?? 'development',
  databaseUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET ?? null,
  frontendUrl: process.env.FRONTEND_URL ?? null,

  // mail
  emailHost: process.env.GOOGLE_EMAIL_HOST ?? null,
  emailClientId: process.env.GOOGLE_CLIENT_ID ?? null,
  emailClientSecret: process.env.GOOGLE_CLIENT_SECRET ?? null,
  emailAccessToken: process.env.GOOGLE_ACCESS_TOKEN ?? null,
  emailRefreshToken: process.env.GOOGLE_REFRESH_TOKEN ?? null,
};

export default config;
