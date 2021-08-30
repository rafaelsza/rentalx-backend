import { v4 as uuidV4 } from 'uuid';

import ICreateRentalDTO from '@modules/rentals/dtos/ICreateRentalDTO';
import Rental from '@modules/rentals/infra/typeorm/entities/Rental';
import IRentalsRepository from '../IRentalsRepository';

class RentalsRepositoryInMemory implements IRentalsRepository {
  rentals: Rental[] = [];

  async findById(id: string): Promise<Rental> {
    return this.rentals.find(rental => rental.id === id);
  }

  async findByUser(user_id: string): Promise<Rental[]> {
    return this.rentals.filter(rental => rental.user_id === user_id);
  }

  async create({
    user_id,
    car_id,
    expected_return_date,
    id,
    end_date,
    total,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = new Rental();

    Object.assign(rental, {
      user_id,
      car_id,
      expected_return_date,
      start_date: new Date(),
      id: id || uuidV4(),
      created_at: new Date(),
      updated_at: new Date(),
      end_date,
      total,
    });

    this.rentals.push(rental);

    return rental;
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    return this.rentals.find(
      rental => rental.car_id === car_id && !rental.end_date,
    );
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    return this.rentals.find(
      rental => rental.user_id === user_id && !rental.end_date,
    );
  }
}

export default RentalsRepositoryInMemory;
