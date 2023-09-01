import { Module } from '@nestjs/common';
import { TelegramModule } from './telegram.module';
import { DataBaseModule } from './database.module';
import { BotModule } from './module/bot/bot.module';
import { UserModule } from './module/user/user.module';

@Module({
  imports: [TelegramModule, DataBaseModule, BotModule, UserModule],
})
export class AppModule { }
