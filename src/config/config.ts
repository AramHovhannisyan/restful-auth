import dotenv from 'dotenv';
dotenv.config({ path: `.env` });

const NODE_ENV = process.env.NODE_ENV || 'prod';
const SERVER_PORT = process.env.SERVER_PORT || 3003;
const JWT_SECRET_ACCESS = process.env.JWT_SECRET_ACCESS || 'MY-SEC';
const JWT_SECRET_REFRESH = process.env.JWT_SECRET_ACCESS || 'MY-SEC2';
const MONGO_HOST = process.env.MONGO_HOST;
const MONGO_PORT = process.env.MONGO_LOCAL_PORT;
const MONGO_USERNAME = process.env.MONGO_USERNAME;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;

export const config = {
  jwt: {
    secretAccess: JWT_SECRET_ACCESS,
    secretRefresh: JWT_SECRET_REFRESH,
  },
  server: {
    port: SERVER_PORT,
    env: NODE_ENV
  },
  db: {
    mongoHost: MONGO_HOST,
    mongoPort: MONGO_PORT,
    mongoUsername: MONGO_USERNAME,
    mongoPassword: MONGO_PASSWORD,
  }
};
