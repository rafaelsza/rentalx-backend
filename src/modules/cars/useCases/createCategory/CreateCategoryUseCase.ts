import Category from '../../entities/Category';
import ICategoriesRepository from '../../repositories/ICategoriesRepository';

interface IRequest {
  name: string;
  description: string;
}

class CreateCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  async execute({ name, description }: IRequest): Promise<Category> {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(
      name,
    );

    if (categoryAlreadyExists) {
      throw new Error('Category already exists!');
    }

    const category = this.categoriesRepository.create({ name, description });

    return category;
  }
}

export default CreateCategoryUseCase;
