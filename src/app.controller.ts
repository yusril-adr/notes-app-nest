import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { GetHelloResponseType } from './app.response';

import * as wrapper from '@helpers/utils/wrapper';

@ApiTags('Index')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): GetHelloResponseType {
    const message = this.appService.getHello();
    return wrapper.response({ message });
  }
}
