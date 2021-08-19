import { Request, Response } from 'express';

import ListCategoryUseCase from './ListCategoryUseCase';

class ListCategoriesController {
  constructor(private listCategoryUseCase: ListCategoryUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const categories = await this.listCategoryUseCase.execute();

    return response.status(200).json(categories);
  }
}

export default ListCategoriesController;
