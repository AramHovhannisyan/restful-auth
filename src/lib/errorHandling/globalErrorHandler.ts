import { Request, Response, NextFunction } from 'express';
import { AppErrorType } from '../types/ErrorTypes';

/**
 * Custom Error handling Middleware
 * provides message, statusCode
 */
export default (err: AppErrorType, req: Request, res: Response, next: NextFunction) => {
  const { message, statusCode } = err;

  if(!statusCode) {
    res.status(500).json({
      status: 'Error',
      message: 'Something Went Wrong',
    });
  }
  
  console.error(err);

  res.status(statusCode);
  res.json({
    status: 'Error',
    message,
  });
};
