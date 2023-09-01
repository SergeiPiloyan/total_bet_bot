import { Module } from "@nestjs/common";
import { TelegrafModule } from "nestjs-telegraf";
import { BotModule } from "./module/bot/bot.module";
import { sessionMiddleware } from "./middlewares/sessionMiddleware";

@Module({
    imports: [
        TelegrafModule.forRoot({
            token: '5557265391:AAFACoLo7a4oroiFfcys5lgKFb8ZHv5k5l0',
            include: [BotModule],
            botName: 'total_bet',
            middlewares: [sessionMiddleware],
        })
    ],
    exports: [TelegrafModule]
})

export class TelegramModule { }