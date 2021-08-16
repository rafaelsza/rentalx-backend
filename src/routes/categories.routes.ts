import { Router, Request, Response } from 'express';

import createCategoryController from '../modules/cars/useCases/createCategory';
import listCategoriesController from '../modules/cars/useCases/listCategories';

const categoriesRoutes = Router();

categoriesRoutes.get('/', (request: Request, response: Response) => {
  return listCategoriesController.handle(request, response);
});

categoriesRoutes.post('/', (request: Request, response: Response) => {
  return createCategoryController.handle(request, response);
});

export default categoriesRoutes;
