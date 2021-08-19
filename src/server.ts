import 'reflect-metadata';

import express from 'express';
import swaggerUI from 'swagger-ui-express';

import appRoutes from './routes';

import './database';
import './shared/container';

import doc from './docs/documentation.json';

const app = express();
app.use(express.json());

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(doc));
app.use(appRoutes);

// eslint-disable-next-line
app.listen(3333, () => console.log('Server started!'));
