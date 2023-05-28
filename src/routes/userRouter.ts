import express from 'express';
import { register, login, logout, refreshToken, getAll } from '../controllers/userController';
import authMiddleware from '../middlewares/authMiddleware';

const userRouter = express.Router();
userRouter.route('/register').post(register);
userRouter.route('/login').post(login);
userRouter.route('/logout').post(logout);
userRouter.route('/refresh').get(refreshToken);
userRouter.route('/').get(authMiddleware, getAll);

export default userRouter;