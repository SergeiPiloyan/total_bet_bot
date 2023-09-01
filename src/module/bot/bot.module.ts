import { Module } from "@nestjs/common";
import { BotService } from "./bot.service";
import { BotUpdate } from "./bot.update";
import { UserModule } from "../user/user.module";

@Module({
    imports: [UserModule],
    providers: [BotService, BotUpdate],
    exports: [BotService],
})

export class BotModule { }