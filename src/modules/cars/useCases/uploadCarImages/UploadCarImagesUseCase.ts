import { inject, injectable } from 'tsyringe';

import CarImage from '@modules/cars/infra/typeorm/entities/CarImage';
import ICarsImagesRepository from '@modules/cars/repositories/ICarsImagesRepository';

interface IRequest {
  car_id: string;
  images_name: string[];
}

@injectable()
class UploadCarImagesUseCase {
  constructor(
    @inject('CarsImagesRepository')
    private carsImagesRepository: ICarsImagesRepository,
  ) {}

  async execute({ car_id, images_name }: IRequest): Promise<CarImage[]> {
    const car_images: CarImage[] = [];

    for (const image of images_name) {
      const car_image = await this.carsImagesRepository.create(car_id, image);

      car_images.push(car_image);
    }

    return car_images;
  }
}

export default UploadCarImagesUseCase;
