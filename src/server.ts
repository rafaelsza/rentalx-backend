import 'reflect-metadata';
import 'express-async-errors';

import express, { NextFunction, Request, Response } from 'express';
import swaggerUI from 'swagger-ui-express';

import AppError from './errors/AppError';

import appRoutes from './routes';

import './database';
import './shared/container';

import doc from './docs/documentation.json';

const app = express();
app.use(express.json());

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(doc));
app.use(appRoutes);

/* eslint-disable no-console */
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.log(err);

  return response.status(500).json({
    status: 'error',
    message: `Internal server error - ${err.message}`,
  });
});

// eslint-disable-next-line
app.listen(3333, () => console.log('Server started!'));
