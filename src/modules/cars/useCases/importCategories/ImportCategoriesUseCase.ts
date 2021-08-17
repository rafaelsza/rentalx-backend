import csvParse from 'csv-parse';
import fs from 'fs';

import Category from '../../models/Category';
import ICategoriesRepository from '../../repositories/ICategoriesRepository';

interface IImportCategory {
  name: string;
  description: string;
}

class ImportCategoriesUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  // eslint-disable-next-line
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

    categoriesImported.forEach(async category => {
      const { name, description } = category;

      const categoryAlreadyExists = this.categoriesRepository.findByName(name);

      if (!categoryAlreadyExists) {
        categories.push(
          this.categoriesRepository.create({
            name,
            description,
          }),
        );
      }
    });

    return categories;
  }
}

export default ImportCategoriesUseCase;
