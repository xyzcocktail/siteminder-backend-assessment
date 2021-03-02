import * as dotenv from 'dotenv';

dotenv.config();

export const configs = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT,
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
  SENDGRID_FROM_EMAIL: process.env.SENDGRID_FROM_EMAIL,
};
