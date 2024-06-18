import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { GetHelloResponseType } from './contracts/app/response.contracts';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): GetHelloResponseType {
    return this.appService.getHello();
  }
}
