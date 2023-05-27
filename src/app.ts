import express, { Request, Response, NextFunction } from 'express';
import { config } from "./config/config.js";

const app = express();

/**
 * Routes
 */
app.get('/health', (req, res) => res.sendStatus(200));

const port = config.server.port;

app.listen(port, () => {
  console.info(`listening on port ${port}`);
});