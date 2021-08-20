import { Router } from 'express';
import categoriesRoutes from './categories.routes';
import specificationsRoutes from './specifications.routes';
import usersRoutes from './users.routes';

const appRoutes = Router();

appRoutes.use('/categories', categoriesRoutes);
appRoutes.use('/specifications', specificationsRoutes);
appRoutes.use('/users', usersRoutes);

export default appRoutes;
