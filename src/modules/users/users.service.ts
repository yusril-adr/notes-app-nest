/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import {
  FindAllUsersResponse,
  FindUserParams,
  UpdateUserParams,
} from './types/users.service';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  async findAll(findUserParams: FindUserParams): Promise<FindAllUsersResponse> {
    throw new Error('USERS_SERVICE.METHOD_NOT_IMPLEMENTED');
  }

  async findOne(id: string): Promise<User | null> {
    throw new Error('USERS_SERVICE.METHOD_NOT_IMPLEMENTED');
  }

  async update(id: string, updateUserParams: UpdateUserParams): Promise<User> {
    throw new Error('USERS_SERVICE.METHOD_NOT_IMPLEMENTED');
  }

  async remove(id: string): Promise<void> {
    throw new Error('USERS_SERVICE.METHOD_NOT_IMPLEMENTED');
  }
}
