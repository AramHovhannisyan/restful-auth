import { Request, Response, NextFunction } from 'express';
import AppError from '../errorHandling/AppError';
import { validateAccessToken } from '../services/tokenService';

export default async function authMiddleware (req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new AppError('Unauthorized', 401);
    }

    const authType = authHeader.split(' ')[0];
    const accessToken = authHeader.split(' ')[1];

    if (authType != 'Bearer') {
      throw new AppError('Wrong authorization type', 401);
    }

    if (!accessToken) {
      throw new AppError('Missing authorization header', 401);
    }

    const userPayload = await validateAccessToken(accessToken);
    if (!userPayload) {
      throw new AppError('Invalid authorization token', 401);
    }

    res.locals.user = userPayload;

    next();
  } catch (error) {
    next(error);
  }
}