import { getRepository, Repository } from 'typeorm';

import Category from '@modules/cars/infra/typeorm/entities/Category';
import ICategoriesRepository, {
  ICreateCategory,
} from '@modules/cars/repositories/ICategoriesRepository';

class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = getRepository(Category);
  }

  async findAll(): Promise<Category[]> {
    const repositories = await this.repository.find();

    return repositories;
  }

  async findByName(name: string): Promise<Category | undefined> {
    const repository = await this.repository.findOne({ name });

    return repository;
  }

  async create({ name, description }: ICreateCategory): Promise<Category> {
    const category = this.repository.create({ name, description });

    await this.repository.save(category);

    return category;
  }
}

export default CategoriesRepository;
