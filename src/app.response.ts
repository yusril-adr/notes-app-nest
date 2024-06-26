import { Response } from '@global/types/response.types';

export type GetHelloResponseType = Response & {
  message: string;
};
