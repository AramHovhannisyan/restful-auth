import { Request, Response, NextFunction } from 'express';
import { AppErrorType } from '../types/ErrorTypes';

export default (err: AppErrorType, req: Request, res: Response, next: NextFunction) => {
  const { msg, statuseCode } = err;
  
  res.status(statuseCode || 500);
  res.json({
    status: 'Error',
    message: msg,
  });
};
