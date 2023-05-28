import { Request, Response, NextFunction } from 'express';
import bcrypt from "bcrypt";
import { registerUser, loginUser, logoutUser, refreshUserToken, getAllUsers } from '../services/userService';
import { generateTokens, saveToDb } from '../services/tokenService';
import { validateRegistrationRequest } from '../validators/validateRegistrationEndpoint';
import { validateLoginRequest } from '../validators/validateLoginEndpoint';

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

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const { error } = validateLoginRequest(req.body);

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
    const usernameOrEmail = (username) ? username : email;

    const user = await loginUser(usernameOrEmail, password);

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

const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    const loggedOut = await logoutUser(refreshToken);
    res.clearCookie('refreshToken');

    return res.status(205).send();
  } catch (error) {
    next(error);
  }
};

const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    const user = await refreshUserToken(refreshToken);

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

export { register, login, logout, refreshToken, getAll };