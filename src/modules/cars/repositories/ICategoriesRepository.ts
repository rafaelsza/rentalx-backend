import Category from '../entities/Category';

export interface ICreateCategory {
  name: string;
  description: string;
}

export default interface ICategoriesRepository {
  findAll(): Promise<Category[]>;
  findByName(name: string): Promise<Category | undefined>;
  create(data: ICreateCategory): Promise<Category>;
}
