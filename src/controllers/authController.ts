import { Request, Response, NextFunction } from 'express';
import { loginUser, logoutUser, refreshUserToken } from '../services/authService';
import { generateAndSaveTokens } from '../services/tokenService';
import { validateLoginRequest } from '../lib/validators/validateLoginEndpoint';

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Validate Request Body
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

    // In case user provided only Email or Username with password
    const { username, email, password } = req.body;
    const usernameOrEmail = (username) ? username : email;

    // Logging in
    const user = await loginUser(usernameOrEmail, password);

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

// Log out user if cookie: refreshToken exists
const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    await logoutUser(refreshToken);
    res.clearCookie('refreshToken');

    return res.status(205).send();
  } catch (error) {
    next(error);
  }
};

/**
 * Generate new AccessToken and RefreshToken
 * REQUIRED cookies: refreshToken
 * REQUIRED refreshToken available in DB 
 */
const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Getting new tokens
    const refreshToken = req.cookies.refreshToken;
    const user = await refreshUserToken(refreshToken);

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

export { login, logout, refreshToken };
