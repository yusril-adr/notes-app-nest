import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

import * as jwt from 'jsonwebtoken';

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(public readonly configService: ConfigService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = jwt.verify(
        token,
        this.configService.get('ACCESS_TOKEN_KEY'),
      );
      request['user'] = payload;
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new ForbiddenException('Token expired');
      }
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
