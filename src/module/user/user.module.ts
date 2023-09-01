import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "src/entity/user.entity";
import { BetCardEntity } from "src/entity/bet_card.entity";
import { BetItem } from "src/entity/bet_item.entity";

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity, BetItem, BetCardEntity])],
    providers: [UserService],
    controllers: [UserController],
    exports: [UserService],
})

export class UserModule { }