/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { SendMailParams } from '@global/types/mail.services.type';

@Injectable()
export class MailService {
  async sendMail(params: SendMailParams): Promise<void> {
    throw new Error('MAIL_SERVICE.METHOD_NOT_IMPLEMENTED');
  }
}
