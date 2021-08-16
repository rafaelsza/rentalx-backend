import Category from '../../models/Category';
import ICategoriesRepository from '../../repositories/ICategoriesRepository';

class ListCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  execute(): Category[] {
    const categories = this.categoriesRepository.findAll();

    return categories;
  }
}

export default ListCategoryUseCase;
