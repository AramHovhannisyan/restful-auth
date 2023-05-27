import { Request, Response, NextFunction } from 'express';
import bcrypt from "bcrypt";
import { createOne } from '../services/userService';
import { generateTokens, saveToDb } from '../services/tokenService';

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, email, password } = req.body;

    const hassPass = await bcrypt.hash(password, 4);
    const user = await createOne(username, email, hassPass);

    // Generate 2 Tokens For Users
    const tokens = await generateTokens(user);

    // Save RefreshToken For User 
    await saveToDb(user, tokens.refreshToken);

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

export { register };