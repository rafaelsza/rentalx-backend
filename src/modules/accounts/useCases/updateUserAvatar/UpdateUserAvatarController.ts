import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateUserAvatarUseCase from './UpdateUserAvatarUseCase';

class UpdateUserAvatarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const updateUserAvatarUseCase = container.resolve(UpdateUserAvatarUseCase);

    const user = await updateUserAvatarUseCase.execute({
      user_id: request.user.id,
      avatar_file: request.file.filename,
    });

    return response.status(200).json(user);
  }
}

export default UpdateUserAvatarController;
