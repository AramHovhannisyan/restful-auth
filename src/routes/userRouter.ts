import express from 'express';
import { register } from '../controllers/userController.js';

const userRouter = express.Router();
userRouter.route('/').post(register);

export { userRouter };