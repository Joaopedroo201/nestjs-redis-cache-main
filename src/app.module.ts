import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CacheModule.register({
      isGlobal: true,
      store: 'redis',
      host: 'localhost',
      port: 6379,
      ttl: 60 * 60 * 24, // 24 horas
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {} 