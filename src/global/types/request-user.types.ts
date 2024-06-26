import { JWTPayload } from './jwt-payload.types';

export type RequestUser = {
  user: JWTPayload;
  token: string;
};
