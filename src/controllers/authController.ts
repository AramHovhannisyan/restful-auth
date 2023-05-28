import { Request, Response, NextFunction } from 'express';
import { loginUser, logoutUser, refreshUserToken } from '../services/authService';
import { generateAndSaveTokens } from '../services/tokenService';
import { validateLoginRequest } from '../validators/validateLoginEndpoint';

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
