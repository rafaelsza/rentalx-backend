import { Router } from 'express';
import multer from 'multer';

import CreateCategoryController from '@modules/cars/useCases/createCategory/CreateCategoryController';
import ListCategoriesController from '@modules/cars/useCases/listCategories/ListCategoriesController';
import ImportCategoriesController from '@modules/cars/useCases/importCategories/ImportCategoriesController';

const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();
const importCategoriesController = new ImportCategoriesController();

const upload = multer({
  dest: './tmp',
});

const categoriesRoutes = Router();

categoriesRoutes.get('/', listCategoriesController.handle);
categoriesRoutes.post('/', createCategoryController.handle);
categoriesRoutes.post(
  '/import',
  upload.single('file'),
  importCategoriesController.handle,
);

export default categoriesRoutes;
