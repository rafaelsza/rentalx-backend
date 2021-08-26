import { v4 as uuidV4 } from 'uuid';

import Specification from '@modules/cars/infra/typeorm/entities/Specification';
import ISpecificationsRepository, {
  ICreateSpecification,
} from '../ISpecificationsRepository';

class SpecificationsRepositoryInMemory implements ISpecificationsRepository {
  specifications: Specification[] = [];

  async create({
    name,
    description,
  }: ICreateSpecification): Promise<Specification> {
    const specification = new Specification();

    Object.assign(specification, { name, description, id: uuidV4() });

    this.specifications.push(specification);

    return specification;
  }

  async findByName(name: string): Promise<Specification> {
    return this.specifications.find(
      specification => specification.name === name,
    );
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    return this.specifications.filter(specification =>
      ids.includes(specification.id),
    );
  }
}
export default SpecificationsRepositoryInMemory;
