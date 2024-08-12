import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import * as nodemailer from 'nodemailer';

import { MailService } from '@global/services/mail/mail.service';
import { SendMailParams } from '@global/types/mail.services.type';

@Injectable()
export class NodemailerService extends MailService {
  private readonly transporter: nodemailer.Transporter;
  private readonly logger = new Logger(NodemailerService.name);
  constructor(public readonly configService: ConfigService) {
    super();

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: this.configService.get('EMAIL_CRED'),
        pass: this.configService.get('EMAIL_PASS'),
      },
    });

    this.transporter = transporter;
  }

  async sendMail(params: SendMailParams): Promise<void> {
    const { from, to, subject, content } = params;
    const email = this.configService.get('EMAIL_CRED');
    const info = await this.transporter.sendMail({
      from: from ? `"${from}" <${email}>` : email,
      to,
      subject,
      html: content,
    });

    this.logger.log('Message sent: %s', info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
  }
}
