import { Request, Response, NextFunction } from 'express';
import bcrypt from "bcrypt";
import { registerUser, getAllUsers } from '../services/userService';
import { generateAndSaveTokens } from '../services/tokenService';
import { validateRegistrationRequest } from '../validators/validateRegistrationEndpoint';

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const { error } = validateRegistrationRequest(req.body);

    if (error) {
      return res.status(400).json({
        status: 'fail',
        message: 'Invalid Request',
        data: {
          details: error.details,
        },
      });
    }

    const { username, email, password } = req.body;

    const hassPass = await bcrypt.hash(password, 4);
    const user = await registerUser(username, email, hassPass);

    // Generate 2 Tokens For Users
    const tokens = await generateAndSaveTokens(user);
    res.cookie('refreshToken', tokens.refreshToken, { maxAge: 15 * 24 * 60 * 60 * 1000, httpOnly: true });

    return res.status(200).json({
      status: 'success',
      data: {
        user,
        ...tokens,
      }
    });
  } catch (error) {
    next(error);
  }
};

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await getAllUsers();

    return res.status(200).json({
      status: 'success',
      data: {
        users,
      }
    });
  } catch (error) {
    next(error);
  }
};

export { register, getAll };