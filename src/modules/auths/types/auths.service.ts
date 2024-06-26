export type RegisterServiceParams = {
  username?: undefined | null | string;
  email: string;
  password: string;
};

export type FindOneParams = Record<string, any>;

export type SaveForgotTokenParams = {
  user_id: string;
  token: string;
};

export type VerifyForgotTokenParams = SaveForgotTokenParams;

export type VerifyForgotTokenResult = VerifyForgotTokenParams & {
  created_at: string;
};
