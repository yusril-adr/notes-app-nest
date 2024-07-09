import { Module } from '@nestjs/common';
import { SupabaseProvider } from '@components/supabase/supabase.provider';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersSupabaseService } from './services/users.supabase/users.supabase.service';
import { AuthsModule } from '@modules/auths/auths.module';

@Module({
  imports: [AuthsModule],
  controllers: [UsersController],
  providers: [
    SupabaseProvider,
    {
      provide: UsersService,
      useClass: UsersSupabaseService,
    },
  ],
})
export class UsersModule {}
