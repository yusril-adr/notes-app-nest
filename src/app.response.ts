import { Response } from '@global/types/response.type';

export type GetHelloResponseType = Response & {
  message: string;
};
