/* istanbul ignore file */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SupabaseProvider } from '@components/supabase/supabase.provider';
import { AuthsModule } from '@modules/auths/auths.module';
import { UsersModule } from '@modules/users/users.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthsModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService, SupabaseProvider],
})
export class AppModule {}
