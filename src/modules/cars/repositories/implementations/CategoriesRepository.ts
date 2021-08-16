import Category from '../../models/Category';
import ICategoriesRepository, {
  ICreateCategory,
} from '../ICategoriesRepository';

class CategoriesRepository implements ICategoriesRepository {
  private categories: Category[];

  private static INSTANCE: CategoriesRepository;

  private constructor() {
    this.categories = [];
  }

  public static getInstance(): CategoriesRepository {
    if (!this.INSTANCE) {
      this.INSTANCE = new CategoriesRepository();
    }

    return this.INSTANCE;
  }

  findAll(): Category[] {
    return this.categories;
  }

  findByName(name: string): Category | undefined {
    return this.categories.find(category => category.name === name);
  }

  create(data: ICreateCategory): Category {
    const category = new Category();

    Object.assign(category, { ...data });

    this.categories.push(category);

    return category;
  }
}

export default CategoriesRepository;
