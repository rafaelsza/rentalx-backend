import Specification from '../entities/Specification';

export interface ICreateSpecification {
  name: string;
  description: string;
}

export default interface ISpecificationsRepository {
  findByName(name: string): Specification | undefined;
  create(data: ICreateSpecification): Specification;
}
