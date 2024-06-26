/* istanbul ignore file */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthsModule } from './modules/auths/auths.module';
import { SupabaseProvider } from './components/supabase/supabase.provider';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthsModule,
  ],
  controllers: [AppController],
  providers: [AppService, SupabaseProvider],
})
export class AppModule {}
