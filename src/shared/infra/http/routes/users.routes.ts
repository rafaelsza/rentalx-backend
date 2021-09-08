import { Router } from 'express';
import multer from 'multer';

import CreateUserController from '@modules/accounts/useCases/createUser/CreateUserController';
import UpdateUserAvatarController from '@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController';
import ProfileUserController from '@modules/accounts/useCases/profileUserUseCase/ProfileUserController';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

import uploadConfig from '@config/upload';

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();
const profileUserController = new ProfileUserController();

const uploadAvatar = multer(uploadConfig);

const usersRoutes = Router();

usersRoutes.post('/', createUserController.handle);
usersRoutes.get('/profile', ensureAuthenticated, profileUserController.handle);

usersRoutes.patch(
  '/avatar',
  ensureAuthenticated,
  uploadAvatar.single('avatar'),
  updateUserAvatarController.handle,
);

export default usersRoutes;
