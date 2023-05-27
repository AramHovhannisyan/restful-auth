import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import cookieParser from "cookie-parser";
import { config } from "./config/config";
import userRouter from './routes/userRouter';
import AppError from './utils/AppError';
import globalErrorHandler from "./controllers/errorController";

const app = express();

/**
 * MiddleWares
 */

app.use(express.json());
app.use(cookieParser());

/**
 * Routes
 */
app.get('/health', (req, res) => res.sendStatus(200));
app.use('/user', userRouter);

app.all('*', (req, res, next) => next(new AppError(`Cant find ${req.originalUrl} on this server`, 404)));

app.use(globalErrorHandler);

const port = config.server.port;

const uri = `mongodb://127.0.0.1:27017/digitec-task`;

app.listen(port, () => {
  console.info(`listening on port ${port}`);
  mongoose
    .connect(uri,{ retryWrites: true })
    .then(() => {
      console.log('connected to DB');
    })
    .catch(err => {
      console.log('error while connecting DB', err);
    });
});