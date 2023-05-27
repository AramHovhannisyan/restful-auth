import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { config } from "./config/config.js";
import { User } from "./models/UserModel.js";

const app = express();

/**
 * Routes
 */
app.get('/health', (req, res) => res.sendStatus(200));

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