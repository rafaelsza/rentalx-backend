import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ImportCategoriesUseCase from './ImportCategoriesUseCase';

class ListCategoriesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { file } = request;

    const importCategoriesUseCase = container.resolve(ImportCategoriesUseCase);

    const categories = await importCategoriesUseCase.execute(file);

    return response.status(200).json(categories);
  }
}

export default ListCategoriesController;
