import * as dotenv from 'dotenv';

dotenv.config();

export const configs = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV || 'development',
  HTTP_TIMEOUT: 3000,
  DEBUG: false,
  FAILOVER: {
    RE_TRY: 3,
    RE_TRY_DELAY: 5000,
  },
  SENDGRID: {
    BASE_URL: process.env.SENDGRID_BASE_URL,
    API_KEY: process.env.SENDGRID_API_KEY,
    FROM_EMAIL: process.env.SENDGRID_FROM_EMAIL,
  },
  MAILGUN: {
    BASE_URL: process.env.MAILGUN_BASE_URL,
    API_KEY: process.env.MAILGUN_API_KEY,
    FROM_EMAIL: process.env.MAILGUN_FROM_EMAIL,
  },
};
