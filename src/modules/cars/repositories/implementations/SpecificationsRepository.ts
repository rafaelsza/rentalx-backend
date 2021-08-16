import Specification from '../../models/Specification';
import ISpecificationsRepository, {
  ICreateSpecification,
} from '../ISpecificationsRepository';

class SpecificationsRepository implements ISpecificationsRepository {
  private specifications: Specification[];

  private static INSTANCE: SpecificationsRepository;

  private constructor() {
    this.specifications = [];
  }

  public static getInstance(): SpecificationsRepository {
    if (!this.INSTANCE) {
      this.INSTANCE = new SpecificationsRepository();
    }

    return this.INSTANCE;
  }

  findByName(name: string): Specification | undefined {
    return this.specifications.find(category => category.name === name);
  }

  create(data: ICreateSpecification): Specification {
    const category = new Specification();

    Object.assign(category, { ...data });

    this.specifications.push(category);

    return category;
  }
}

export default SpecificationsRepository;
