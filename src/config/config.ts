import dotenv from 'dotenv';

const NODE_ENV = process.env.NODE_ENV || 'prod';
dotenv.config({ path: `.env.${NODE_ENV}` });

const SERVER_PORT = process.env.SERVER_PORT || 3003;
const JWT_SECRET = process.env.JWT_SECRET || 'MY-SEC';

export const config = {
  jwt: {
    secret: JWT_SECRET,
  },
  server: {
    port: SERVER_PORT,
    env: NODE_ENV
  },
};
