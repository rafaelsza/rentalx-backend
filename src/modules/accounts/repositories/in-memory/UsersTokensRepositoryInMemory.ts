import { v4 as uuidV4 } from 'uuid';

import ICreateUserTokenDTO from '@modules/accounts/dtos/ICreateUserTokenDTO';
import UserToken from '@modules/accounts/infra/typeorm/entities/UserToken';
import IUsersTokensRepository from '../IUsersTokensRepository';

class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
  private usersTokens: UserToken[] = [];

  async create({
    user_id,
    expires_date,
    refresh_token,
  }: ICreateUserTokenDTO): Promise<UserToken> {
    const userToken = new UserToken();

    Object.assign(userToken, {
      user_id,
      expires_date,
      refresh_token,
      id: uuidV4(),
      created_at: new Date(),
    });

    this.usersTokens.push(userToken);

    return userToken;
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string,
  ): Promise<UserToken> {
    const token = this.usersTokens.find(
      userToken =>
        userToken.user_id === user_id &&
        userToken.refresh_token === refresh_token,
    );

    return token;
  }

  async deleteById(id: string): Promise<void> {
    const token = this.usersTokens.findIndex(userToken => userToken.id === id);

    this.usersTokens.splice(1, token);
  }

  async findByRefreshToken(refresh_token: string): Promise<UserToken> {
    const token = this.usersTokens.find(
      userToken => userToken.refresh_token === refresh_token,
    );

    return token;
  }
}

export default UsersTokensRepositoryInMemory;
