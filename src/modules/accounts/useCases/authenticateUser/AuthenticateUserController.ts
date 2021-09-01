import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthenticateUserUseCase from './AuthenticateUserUseCase';

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase);

    const session = await authenticateUserUseCase.execute({
      email,
      password,
    });

    return response.status(200).json(session);
  }
}

export default CreateUserController;
