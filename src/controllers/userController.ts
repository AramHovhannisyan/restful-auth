import { Request, Response, NextFunction } from 'express';
import bcrypt from "bcrypt";
import { createOne } from '../services/userService';

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, email, password } = req.body;

    const hassPass = await bcrypt.hash(password, 4);
    const user = await createOne(username, email, hassPass);

    return res.status(200).json({
      status: 'success',
      data: {
        user,
      }
    });
  } catch (error) {
    next(error);
  }
};

export { register };