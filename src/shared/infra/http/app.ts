import 'reflect-metadata';
import 'express-async-errors';
import 'dotenv/config';

import express, { NextFunction, Request, Response } from 'express';
import swaggerUI from 'swagger-ui-express';
import cors from 'cors';
import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';

import AppError from '@shared/errors/AppError';

import createConnection from '@shared/infra/typeorm';
import uploadConfig from '@config/upload';
import appRoutes from './routes';

import '@shared/container';

import doc from '../../../docs/documentation.json';
import rateLimiter from './middlewares/rateLimiter';

createConnection();

const app = express();

app.use(rateLimiter);

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Tracing.Integrations.Express({ app }),
  ],
  tracesSampleRate: 1.0,
});
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.use(express.json());

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(doc));
app.use('/avatar', express.static(`${uploadConfig.tmpFolder}/avatar`));
app.use('/cars', express.static(`${uploadConfig.tmpFolder}/cars`));

app.use(cors());
app.use(appRoutes);

app.use(Sentry.Handlers.errorHandler());

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
