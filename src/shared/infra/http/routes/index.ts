import { Router } from 'express';

import authenticateRoutes from './authenticate.routes';
import categoriesRoutes from './categories.routes';
import specificationsRoutes from './specifications.routes';
import usersRoutes from './users.routes';
import carsRoutes from './cars.routes';
import rentalsRoutes from './rentals.routes';
import passwordRoutes from './password.routes';

const appRoutes = Router();

appRoutes.use(authenticateRoutes);
appRoutes.use('/categories', categoriesRoutes);
appRoutes.use('/specifications', specificationsRoutes);
appRoutes.use('/users', usersRoutes);
appRoutes.use('/cars', carsRoutes);
appRoutes.use('/rentals', rentalsRoutes);
appRoutes.use('/password', passwordRoutes);

export default appRoutes;
