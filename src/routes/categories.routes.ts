import { Router, Request, Response } from 'express';
import multer from 'multer';

import createCategoryController from '../modules/cars/useCases/createCategory';
import listCategoriesController from '../modules/cars/useCases/listCategories';
import importCategoriesController from '../modules/cars/useCases/importCategories';

const upload = multer({
  dest: './tmp',
});

const categoriesRoutes = Router();

categoriesRoutes.get('/', (request: Request, response: Response) => {
  return listCategoriesController.handle(request, response);
});

categoriesRoutes.post('/', (request: Request, response: Response) => {
  return createCategoryController.handle(request, response);
});

categoriesRoutes.post(
  '/import',
  upload.single('file'),
  (request: Request, response: Response) => {
    return importCategoriesController.handle(request, response);
  },
);

export default categoriesRoutes;
