import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { BetCardEntity } from './entity/bet_card.entity';
import { BetItem } from './entity/bet_item.entity';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'app',
            password: 'p@ssw0rd',
            database: 'total_bet_db',
            entities: [UserEntity, BetCardEntity, BetItem],
            synchronize: true,
        }),
    ],
})

export class DataBaseModule { }