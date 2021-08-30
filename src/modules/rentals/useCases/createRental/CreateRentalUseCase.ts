import { inject, injectable } from 'tsyringe';

import IRentalsRepository from '@modules/rentals/repositories/IRentalsRepository';
import Rental from '@modules/rentals/infra/typeorm/entities/Rental';
import ICreateRentalDTO from '@modules/rentals/dtos/ICreateRentalDTO';

import ICarsRepository from '@modules/cars/repositories/ICarsRepository';
import IDateProvider from '@shared/container/providers/DateProvider/IDateProvider';

import AppError from '@shared/errors/AppError';

@injectable()
class CreateRentalUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,

    @inject('CarsRepository')
    private carsRepository: ICarsRepository,

    @inject('DateProvider')
    private dateProvider: IDateProvider,
  ) {}

  async execute({
    user_id,
    car_id,
    expected_return_date,
  }: ICreateRentalDTO): Promise<Rental> {
    const minimumHour = 24;

    const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(
      car_id,
    );

    if (carUnavailable) {
      throw new AppError('Car is unavailable');
    }

    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(
      user_id,
    );

    if (rentalOpenToUser) {
      throw new AppError("There's a rental in progress for user!");
    }

    const compare = this.dateProvider.compareInHours(
      this.dateProvider.dateNow(),
      expected_return_date,
    );

    if (compare < minimumHour) {
      throw new AppError('Invalid return time!');
    }

    const rental = await this.rentalsRepository.create({
      user_id,
      car_id,
      expected_return_date,
    });

    await this.carsRepository.updatedAvailable(car_id, false);

    return rental;
  }
}

export default CreateRentalUseCase;
