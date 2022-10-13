import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';

import './database';
import { router } from './routes';

const app = express();
app.use(express.json());
app.use(router);
app.use(
  (
    err: Error,
    _request: Request,
    response: Response,
    _callback: NextFunction
  ) => {
    if (err instanceof Error)
      return response.status(400).json({ error: err.message });
    return response
      .status(500)
      .json({ status: 'error', message: 'Internal server error' });
  }
);

app.listen(3000, () => console.log('Go to http://localhost:3000'));
