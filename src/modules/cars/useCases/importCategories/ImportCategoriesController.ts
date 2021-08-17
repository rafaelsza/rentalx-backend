import { Request, Response } from 'express';

import ImportCategoriesUseCase from './ImportCategoriesUseCase';

class ListCategoriesController {
  constructor(private importCategoriesUseCase: ImportCategoriesUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { file } = request;

    const categories = await this.importCategoriesUseCase.execute(file);

    return response.status(200).json(categories);
  }
}

export default ListCategoriesController;
