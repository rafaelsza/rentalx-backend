import 'reflect-metadata';

import express from 'express';
import appRoutes from './routes';

import './database';

const app = express();
app.use(express.json());

app.use(appRoutes);

// eslint-disable-next-line
app.listen(3333, () => console.log('Server started!'));
