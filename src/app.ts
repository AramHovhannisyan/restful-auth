import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import cookieParser from "cookie-parser";
import { config } from "./lib/config/config";
import swaggerOptions from "./lib/config/swaggerOptions";
import userRouter from './routes/userRouter';
import authRouter from './routes/authRouter';
import AppError from './lib/errorHandling/AppError';
import globalErrorHandler from "./lib/errorHandling/globalErrorHandler";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

const app = express();

/**
 * Swagger Setup
 */

const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * MiddleWares
 */

app.use(express.json());
app.use(cookieParser());

/**
 * Routes
 */
app.get('/health', (req, res) => res.sendStatus(200));
app.use('/api/v1/user', userRouter);
app.use('/api/v1/auth', authRouter);

app.get('/favicon.ico', (req, res) => res.sendStatus(204));

/**
 * Handling Errors
 */
app.all('*', (req, res, next) => next(new AppError(`Cant find ${req.originalUrl} on this server`, 404)));
app.use(globalErrorHandler);

/**
 * Building App
 */
const port = config.server.port;
const { mongoHost, mongoPort, mongoUsername, mongoPassword } = config.db;

const uri = `mongodb://${mongoUsername}:${mongoPassword}@${mongoHost}:${mongoPort}`;

mongoose
.connect(uri,{ retryWrites: true })
.then(() => {
  console.info('connected to DB');

  app.listen(port, () => console.info(`listening on port ${port}`));
})
.catch(err => {
  console.error('error while connecting DB', err);
});

