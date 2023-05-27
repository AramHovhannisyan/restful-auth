import dotenv from 'dotenv';

const NODE_ENV = process.env.NODE_ENV || 'prod';
dotenv.config({ path: `.env.${NODE_ENV}` });

const SERVER_PORT = process.env.SERVER_PORT || 3003;
const JWT_SECRET_ACCESS = process.env.JWT_SECRET_ACCESS || 'MY-SEC';
const JWT_SECRET_REFRESH = process.env.JWT_SECRET_ACCESS || 'MY-SEC2';

export const config = {
  jwt: {
    secretAccess: JWT_SECRET_ACCESS,
    secretRefresh: JWT_SECRET_REFRESH,
  },
  server: {
    port: SERVER_PORT,
    env: NODE_ENV
  },
};
