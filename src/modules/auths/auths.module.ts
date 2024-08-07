import { Module } from '@nestjs/common';
import { MailService } from '@global/services/mail/mail.service';
import { NodemailerService } from '@components/nodemailer/mail.nodemailer.services';

import { AuthsService } from './auths.service';
import { AuthsController } from './auths.controller';
import { AuthsSupabaseService } from './services/auths.supabase.service';

@Module({
  controllers: [AuthsController],
  providers: [
    {
      provide: AuthsService,
      useClass: AuthsSupabaseService,
    },
    {
      provide: MailService,
      useClass: NodemailerService,
    },
  ],
  exports: [
    {
      provide: AuthsService,
      useClass: AuthsSupabaseService,
    },
  ],
})
export class AuthsModule {}
