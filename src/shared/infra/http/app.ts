import 'reflect-metadata';
import 'express-async-errors';
import 'dotenv/config';

import express, { NextFunction, Request, Response } from 'express';
import swaggerUI from 'swagger-ui-express';

import AppError from '@shared/errors/AppError';

import createConnection from '@shared/infra/typeorm';
import uploadConfig from '@config/upload';
import appRoutes from './routes';

import '@shared/container';

import doc from '../../../docs/documentation.json';

createConnection();

const app = express();
app.use(express.json());

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(doc));
app.use('/avatar', express.static(`${uploadConfig.tmpFolder}/avatar`));
app.use('/cars', express.static(`${uploadConfig.tmpFolder}/cars`));

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

export default app;
