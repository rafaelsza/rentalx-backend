import Category from '../models/Category';

export interface ICreateCategory {
  name: string;
  description: string;
}

export default interface ICategoriesRepository {
  findAll(): Category[];
  findByName(name: string): Category | undefined;
  create(data: ICreateCategory): Category;
}
