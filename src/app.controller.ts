import { Controller, Get, Param, Delete } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('cache')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':key')
  async getData(@Param('key') key: string): Promise<string> {
    return this.appService.getData(key);
  }

  @Delete(':key')
  async invalidateCache(@Param('key') key: string): Promise<void> {
    return this.appService.invalidateCache(key);
  }
} 