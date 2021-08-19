import Specification from '../entities/Specification';

export interface ICreateSpecification {
  name: string;
  description: string;
}

export default interface ISpecificationsRepository {
  findByName(name: string): Promise<Specification | undefined>;
  create(data: ICreateSpecification): Promise<Specification>;
}
