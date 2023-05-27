import { Request, Response, NextFunction } from 'express';
import { createOne } from '../services/userService.js';

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, email, password } = req.body;

    const user = await createOne(username, email, password);

    return res.status(200).json({
      status: 'success',
      data: {
        user,
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export { register };