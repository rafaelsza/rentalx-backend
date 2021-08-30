import { inject, injectable } from 'tsyringe';

import IRentalsRepository from '@modules/rentals/repositories/IRentalsRepository';
import ICarsRepository from '@modules/cars/repositories/ICarsRepository';
import IDateProvider from '@shared/container/providers/DateProvider/IDateProvider';

import Rental from '@modules/rentals/infra/typeorm/entities/Rental';

import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
  user_id: string;
}

@injectable()
class DevolutionRentalUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,

    @inject('CarsRepository')
    private carsRepository: ICarsRepository,

    @inject('DateProvider')
    private dateProvider: IDateProvider,
  ) {}

  async execute({ id, user_id }: IRequest): Promise<Rental> {
    const minimum_daily = 1;

    const rental = await this.rentalsRepository.findById(id);

    if (!rental) {
      throw new AppError('Rental dos not exists');
    }

    const car = await this.carsRepository.findById(rental.car_id);

    const date_now = this.dateProvider.dateNow();

    let daily = this.dateProvider.compareInDays(rental.start_date, date_now);

    if (daily <= 0) {
      daily = minimum_daily;
    }

    const delay = this.dateProvider.compareInDays(
      date_now,
      rental.expected_return_date,
    );

    let total = 0;

    if (delay > 0) {
      const calculate_fine = delay * car.fine_amount;
      total = calculate_fine;
    }

    total += daily * car.daily_rate;

    rental.end_date = date_now;
    rental.total = total;

    await this.rentalsRepository.create(rental);
    await this.carsRepository.updatedAvailable(car.id, true);

    return rental;
  }
}

export default DevolutionRentalUseCase;
