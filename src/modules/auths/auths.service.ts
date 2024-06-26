/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import {
  RegisterServiceParams,
  FindOneParams,
  VerifyForgotTokenResult,
  SaveForgotTokenParams,
  VerifyForgotTokenParams,
} from './types/auths.service';
import { Auth } from './entities/auth.entity';

@Injectable()
export class AuthsService {
  async register(registerServiceParams: RegisterServiceParams): Promise<Auth> {
    throw new Error('AUTHS_SERVICE.METHOD_NOT_IMPLEMENTED');
  }

  async findOne(findOne: FindOneParams): Promise<Auth | null> {
    throw new Error('AUTHS_SERVICE.METHOD_NOT_IMPLEMENTED');
  }

  async saveRefreshToken(token: string): Promise<void> {
    throw new Error('AUTHS_SERVICE.METHOD_NOT_IMPLEMENTED');
  }

  async findRefreshToken(token: string): Promise<string | null> {
    throw new Error('AUTHS_SERVICE.METHOD_NOT_IMPLEMENTED');
  }

  async deleteRefreshToken(token: string): Promise<void> {
    throw new Error('AUTHS_SERVICE.METHOD_NOT_IMPLEMENTED');
  }

  async saveForgotToken(saveForgotToken: SaveForgotTokenParams): Promise<void> {
    throw new Error('AUTHS_SERVICE.METHOD_NOT_IMPLEMENTED');
  }

  async verifyForgotToken(
    verifyForgotTokenParams: VerifyForgotTokenParams,
  ): Promise<VerifyForgotTokenResult> {
    throw new Error('AUTHS_SERVICE.METHOD_NOT_IMPLEMENTED');
  }

  async deleteForgotToken(token: string): Promise<void> {
    throw new Error('AUTHS_SERVICE.METHOD_NOT_IMPLEMENTED');
  }

  async updatePassword(userId: string, newPassword: string): Promise<void> {
    throw new Error('AUTHS_SERVICE.METHOD_NOT_IMPLEMENTED');
  }
}
