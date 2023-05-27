import dotenv from 'dotenv';
dotenv.config();

const SERVER_PORT = process.env.SERVER_PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'MY-SEC';

export const config = {
  jwt: {
    secret: JWT_SECRET,
  },
  server: {
    port: SERVER_PORT,
  },
};
