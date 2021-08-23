import { v4 as uuidV4 } from 'uuid';

import Category from '@modules/cars/infra/typeorm/entities/Category';
import ICategoriesRepository, {
  ICreateCategory,
} from '@modules/cars/repositories/ICategoriesRepository';

class CategoriesRepositoryInMemory implements ICategoriesRepository {
  categories: Category[] = [];

  async findAll(): Promise<Category[]> {
    return this.categories;
  }

  async findByName(name: string): Promise<Category> {
    return this.categories.find(category => category.name === name);
  }

  async create({ name, description }: ICreateCategory): Promise<Category> {
    const category = new Category();

    Object.assign(category, {
      name,
      description,
      id: uuidV4(),
      created_at: new Date(),
    });

    this.categories.push(category);

    return category;
  }
}

export default CategoriesRepositoryInMemory;
