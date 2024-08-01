import { Module } from '@nestjs/common';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersSupabaseService } from './services/users.supabase.service';
import { AuthsModule } from '@modules/auths/auths.module';

@Module({
  imports: [AuthsModule],
  controllers: [UsersController],
  providers: [
    {
      provide: UsersService,
      useClass: UsersSupabaseService,
    },
  ],
})
export class UsersModule {}
