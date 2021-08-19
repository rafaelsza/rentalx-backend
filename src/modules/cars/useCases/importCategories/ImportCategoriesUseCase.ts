import csvParse from 'csv-parse';
import fs from 'fs';
import { inject, injectable } from 'tsyringe';

import Category from '../../entities/Category';
import ICategoriesRepository from '../../repositories/ICategoriesRepository';

interface IImportCategory {
  name: string;
  description: string;
}

@injectable()
class ImportCategoriesUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);
      const categories: IImportCategory[] = [];

      const parseFile = csvParse();

      stream.pipe(parseFile);

      parseFile
        .on('data', async line => {
          const [name, description] = line;
          categories.push({
            name,
            description,
          });
        })
        .on('end', () => {
          fs.promises.unlink(file.path);
          resolve(categories);
        })
        .on('error', error => {
          reject(error);
        });
    });
  }

  async execute(file: Express.Multer.File): Promise<Category[]> {
    const categoriesImported = await this.loadCategories(file);

    const categories: Category[] = [];

    for (const category of categoriesImported) {
      const { name, description } = category;

      const categoryAlreadyExists = await this.categoriesRepository.findByName(
        name,
      );

      if (!categoryAlreadyExists) {
        categories.push(
          await this.categoriesRepository.create({
            name,
            description,
          }),
        );
      }
    }

    return categories;
  }
}

export default ImportCategoriesUseCase;
