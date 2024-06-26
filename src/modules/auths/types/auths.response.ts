import { Auth } from '../entities/auth.entity';

export type RegisterResponse = {
  id: string;
  email: string;
  username: string;
};

export type LoginResponse = Omit<Auth, 'password'> & {
  access_token: string;
  refresh_token: string;
};

export type LoginByTokenResponse = {
  id: string;
  email: string;
  username: string;
  profile_img: string;
};

export type RenewAccessTokenResponse = {
  access_token: string;
};
