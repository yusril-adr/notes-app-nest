/* istanbul ignore file */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SupabaseProvider } from '@components/supabase/supabase.provider';
import { AuthsModule } from '@modules/auths/auths.module';
import { UsersModule } from '@modules/users/users.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotesModule } from './modules/notes/notes.module';
import { UtilitiesModule } from './modules/utilities/utilities.module';
import { SupabaseModule } from './modules/global/supabase/supabase.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthsModule,
    UsersModule,
    NotesModule,
    UtilitiesModule,
    SupabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService, SupabaseProvider],
})
export class AppModule {}
