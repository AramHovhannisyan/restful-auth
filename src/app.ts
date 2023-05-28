import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import cookieParser from "cookie-parser";
import { config } from "./config/config";
import userRouter from './routes/userRouter';
// import authRouter from './routes/authRouter';
import AppError from './utils/AppError';
import globalErrorHandler from "./controllers/errorController";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

const app = express();

/**
 * Swagger Setup
 */

const options = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "REST API for Swagger Documentation",
      version: "1.0.0",
    },
    schemes: ["http", "https"],
    servers: [{ url: "http://localhost:3004/" }],
  },
  apis: [
    `${__dirname}/routes/*.ts`,
    // "./dist/routes/*.js",
  ],
};
const swaggerSpec = swaggerJSDoc(options);
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
// app.use('/api/v1/auth', authRouter);

app.all('*', (req, res, next) => next(new AppError(`Cant find ${req.originalUrl} on this server`, 404)));

app.use(globalErrorHandler);

const port = config.server.port;
const { mongoHost, mongoPort, mongoUsername, mongoPassword } = config.db;

// const uri = `mongodb://${mongoUsername}:${mongoPassword}@${mongoHost}:${mongoPort}`;
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