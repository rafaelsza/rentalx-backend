import { inject, injectable } from 'tsyringe';
import { hash } from 'bcrypt';

import User from '@modules/accounts/infra/typeorm/entities/User';
import IUsersRepository from '@modules/accounts/repositories/IUsersRepository';

import ICreateUserDTO from '@modules/accounts/dtos/ICreateUserDTO';

import AppError from '@shared/errors/AppError';

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    name,
    password,
    email,
    driver_license,
  }: ICreateUserDTO): Promise<User> {
    const emailAlreadyExists = await this.usersRepository.findByEmail(email);

    if (emailAlreadyExists) {
      throw new AppError('Email is already in use!');
    }

    const passwordHash = await hash(password, 8);

    const user = this.usersRepository.create({
      name,
      password: passwordHash,
      email,
      driver_license,
    });

    return user;
  }
}

export default CreateUserUseCase;
