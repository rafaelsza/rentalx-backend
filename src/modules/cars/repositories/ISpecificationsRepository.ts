import Specification from '../infra/typeorm/entities/Specification';

export interface ICreateSpecification {
  name: string;
  description: string;
}

export default interface ISpecificationsRepository {
  create(data: ICreateSpecification): Promise<Specification>;
  findByName(name: string): Promise<Specification | undefined>;
  findByIds(ids: string[]): Promise<Specification[]>;
}
