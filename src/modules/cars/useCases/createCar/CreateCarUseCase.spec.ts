import CarsRepositoryInMemory from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import AppError from '@shared/errors/AppError';
import CreateCarUseCase from './CreateCarUseCase';

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('Create car', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it('should be able to create new car', async () => {
    const car = await createCarUseCase.execute({
      name: 'Name car',
      description: 'Description car',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'Brand',
      category_id: 'category_id',
    });

    expect(car).toHaveProperty('id');
  });

  it('should not be able to create a car with exists license plate', async () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: 'Name car 1',
        description: 'Description car',
        daily_rate: 100,
        license_plate: 'ABC-1234',
        fine_amount: 60,
        brand: 'Brand',
        category_id: 'category_id',
      });

      await createCarUseCase.execute({
        name: 'Name car 2',
        description: 'Description car',
        daily_rate: 100,
        license_plate: 'ABC-1234',
        fine_amount: 60,
        brand: 'Brand',
        category_id: 'category_id',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a car with available true by default', async () => {
    const car = await createCarUseCase.execute({
      name: 'Name car available test',
      description: 'Description car',
      daily_rate: 100,
      license_plate: 'DEF-5678',
      fine_amount: 60,
      brand: 'Brand',
      category_id: 'category_id',
    });

    expect(car.available).toBe(true);
  });
});
