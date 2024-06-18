import { Response } from '../globals.contracts';

export type GetHelloResponseType = Response & {
  message: string;
};
