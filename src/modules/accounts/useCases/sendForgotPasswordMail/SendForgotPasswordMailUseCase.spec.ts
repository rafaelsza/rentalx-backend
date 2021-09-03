import UsersRepositoryInMemory from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import UsersTokensRepositoryInMemory from '@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory';
import DayJSDateProvider from '@shared/container/providers/DateProvider/implementations/DayJSDateProvider';
import MailProviderInMemory from '@shared/container/providers/MailProvider/in-memory/MailProviderInMemory';
import AppError from '@shared/errors/AppError';
import SendForgotPasswordMailUseCase from './SendForgotPasswordMailUseCase';

let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let dateProvider: DayJSDateProvider;
let mailProvider: MailProviderInMemory;

describe('Send Forgot Mail', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dateProvider = new DayJSDateProvider();
    mailProvider = new MailProviderInMemory();
    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider,
    );
  });

  it('should be able to send a forgot password mail to user', async () => {
    const sendMail = jest.spyOn(mailProvider, 'sendMail');

    const user = await usersRepositoryInMemory.create({
      driver_license: '214756',
      email: 'jueni@mun.ml',
      name: 'Trevor Richardson',
      password: '12345678',
    });

    await sendForgotPasswordMailUseCase.execute(user.email);

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to send an email if user does not exists', async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute('ovooho@odafatepe.tn'),
    ).rejects.toEqual(new AppError('User does not exists!'));
  });

  it('should be able to create an users token', async () => {
    const generateTokenMail = jest.spyOn(
      usersTokensRepositoryInMemory,
      'create',
    );

    const user = await usersRepositoryInMemory.create({
      driver_license: '893682',
      email: 'to@igocus.gl',
      name: 'Alejandro Hicks',
      password: '12345678',
    });

    await sendForgotPasswordMailUseCase.execute(user.email);

    expect(generateTokenMail).toBeCalled();
  });
});
