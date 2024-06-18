import { Injectable } from '@nestjs/common';
import { GetHelloResponseType } from './contracts/app/response.contracts';

@Injectable()
export class AppService {
  getHello(): GetHelloResponseType {
    return {
      status: 200,
      message: 'Hello World !',
    };
  }
}
