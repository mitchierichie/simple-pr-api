import { config } from 'dotenv';
const envFileModifier = process.env.NODE_ENV || 'development';
config({ path: `.env.${envFileModifier}.local` });

const { NODE_ENV, PORT, SECRET_KEY, LOG_FORMAT, LOG_DIR, ORIGIN, GITHUB_USERNAME } = process.env;
const GITHUB_TOKEN_RAW = GITHUB_USERNAME + ':' + process.env.GITHUB_TOKEN;
const GITHUB_HAS_TOKEN = Boolean(GITHUB_USERNAME) && GITHUB_TOKEN_RAW !== GITHUB_USERNAME + ':';
const GITHUB_TOKEN = Buffer.from(GITHUB_TOKEN_RAW).toString('base64');

export { NODE_ENV, PORT, SECRET_KEY, LOG_FORMAT, LOG_DIR, ORIGIN, GITHUB_USERNAME, GITHUB_HAS_TOKEN, GITHUB_TOKEN };
