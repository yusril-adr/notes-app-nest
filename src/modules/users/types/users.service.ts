import { User } from '../entities/user.entity';

export type FindUserParams = {
  row: number | 10;
  page: number | 1;
  filter?: undefined | null | Record<string, any>;
  search?: undefined | null | Record<string, any>;
};

export type FindAllUsersResponse = {
  data: User[];
  count: number;
};

export type UpdateUserParams = {
  id?: string;
  username?: string;
  email?: string;
  profile_img?: string;
};
