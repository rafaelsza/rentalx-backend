import AppError from '@shared/errors/AppError';
import UsersRepositoryInMemory from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import ICreateUserDTO from '@modules/accounts/dtos/ICreateUserDTO';
import CreateUserUseCase from '../createUser/CreateUserUseCase';
import AuthenticateUserUseCase from './AuthenticateUserUseCase';

let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let authenticateUserUseCase: AuthenticateUserUseCase;

describe('Authenticate user', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory,
    );
  });

  it('should be able to authenticate an user', async () => {
    const user: ICreateUserDTO = {
      name: 'User test',
      email: 'test@example.com',
      password: 'password',
      driver_license: '000111',
    };

    await createUserUseCase.execute(user);

    const authenticationResult = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(authenticationResult).toHaveProperty('token');
  });

  it('should not be able to authenticate an nonexistent user', async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: 'test@example.com',
        password: 'test',
      }),
    ).rejects.toEqual(new AppError('Email or password incorrect'));
  });

  it('should not be able to authenticate with incorrect password', async () => {
    const user: ICreateUserDTO = {
      name: 'User test password',
      email: 'test-password@example.com',
      password: 'password',
      driver_license: '111222',
    };

    await createUserUseCase.execute(user);

    await expect(
      authenticateUserUseCase.execute({
        email: 'test-password@example.com',
        password: 'incorrect',
      }),
    ).rejects.toEqual(new AppError('Email or password incorrect'));
  });
});
