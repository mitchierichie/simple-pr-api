import { config } from 'dotenv';
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const GITHUB_TOKEN = Buffer.from(process.env.GITHUB_USERNAME + ':' + process.env.GITHUB_TOKEN).toString('base64');

export const { NODE_ENV, PORT, SECRET_KEY, LOG_FORMAT, LOG_DIR, ORIGIN } = process.env;
