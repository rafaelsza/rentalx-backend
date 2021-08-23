import AppError from '../../../../errors/AppError';
import ICreateUserDTO from '../../dtos/ICreateUserDTO';
import UsersRepositoryInMemory from '../../repositories/in-memory/UsersRepositoryInMemory';
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

  it('should not be able to authenticate an nonexistent user', () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: 'test@example.com',
        password: 'test',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with incorrect password', () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        name: 'User test password',
        email: 'test-password@example.com',
        password: 'password',
        driver_license: '111222',
      };

      await createUserUseCase.execute(user);

      await authenticateUserUseCase.execute({
        email: 'test-password@example.com',
        password: 'incorrect',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
