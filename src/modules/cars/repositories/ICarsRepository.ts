import Car from '../infra/typeorm/entities/Car';

import ICreateCarDTO from '../dtos/ICreateCarDTO';

interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>;
  findById(id: string): Promise<Car>;
  findByLicensePlate(license_plate: string): Promise<Car>;
  findAvailable(
    brand?: string,
    category_id?: string,
    name?: string,
  ): Promise<Car[]>;
  updatedAvailable(id: string, available: boolean): Promise<void>;
}

export default ICarsRepository;
