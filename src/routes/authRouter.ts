import express from 'express';
import { login, logout, refreshToken } from '../controllers/authController';
const authRouter = express.Router();
authRouter.route('/login').post(login);
authRouter.route('/logout').post(logout);
authRouter.route('/refresh').get(refreshToken);

export default authRouter;