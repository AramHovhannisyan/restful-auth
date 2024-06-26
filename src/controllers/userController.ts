import { Request, Response, NextFunction } from 'express';
import bcrypt from "bcryptjs";
import { registerUser, getAllUsers } from '../services/userService';
import { generateAndSaveTokens } from '../services/tokenService';
import { validateRegistrationRequest } from '../lib/validators/validateRegistrationEndpoint';

// Sign Up User
const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Validate Request Body
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

    // Register User
    const passSalt = bcrypt.genSaltSync(10);
    
    const hashPass = await bcrypt.hash(password, passSalt);
    const user = await registerUser(username, email, hashPass);

    // Generate tokens and save to cookie
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

/**
 * Get All Users PROTECTED Endpoint
 */
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