import { inject, injectable } from 'tsyringe';

import CarImage from '@modules/cars/infra/typeorm/entities/CarImage';
import ICarsImagesRepository from '@modules/cars/repositories/ICarsImagesRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/IStorageProvider';

interface IRequest {
  car_id: string;
  images_name: string[];
}

@injectable()
class UploadCarImagesUseCase {
  constructor(
    @inject('CarsImagesRepository')
    private carsImagesRepository: ICarsImagesRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  async execute({ car_id, images_name }: IRequest): Promise<CarImage[]> {
    const car_images: CarImage[] = [];

    for (const image of images_name) {
      const car_image = await this.carsImagesRepository.create(car_id, image);
      await this.storageProvider.save(image, 'cars');

      car_images.push(car_image);
    }

    return car_images;
  }
}

export default UploadCarImagesUseCase;
