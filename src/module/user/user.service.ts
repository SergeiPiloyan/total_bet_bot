import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "src/entity/user.entity";
import { Repository } from "typeorm";
import { CreateUserDTO } from "./user.dto";
import { BetCardEntity } from "src/entity/bet_card.entity";
import { BetItem } from "src/entity/bet_item.entity";
import { CreateBetItemDTO } from "./bet_item.dto";


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,

        @InjectRepository(BetCardEntity)
        private betCardRepository: Repository<BetCardEntity>,

        @InjectRepository(BetItem)
        private betItemRepository: Repository<BetItem>,
    ) { }

    async createUser(dto: CreateUserDTO) {
        const newUser = this.userRepository.create(dto);
        console.log(newUser);
        const betCard = this.betCardRepository.create({
            userId: newUser.uid
        });
        await this.betCardRepository.save(betCard);
        newUser.bet_card = betCard;
        await this.userRepository.save(newUser)
        return newUser
    }

    async add(dto: CreateBetItemDTO) {
        const item = this.betItemRepository.create(dto);
        await this.betItemRepository.save(item);
        return item;
    }

    async addMatchId(id: string, payload: { matchId: number, coef: number, type: 'P1' | 'X' | 'P2' }) {
        const user = await this.getUser(id)
        const betItem = this.betItemRepository.create({ matchId: String(payload.matchId), bet_card_id: String(user.bet_card.id) })
        await this.betItemRepository.save(betItem)
    }

    async getUser(uid: string) {
        return await this.userRepository.findOne({ where: { uid } });
    }

    async updatePhoneNumber({ id, phone }: { id: string, phone: string }) {
        console.log(id, phone);
        const user = await this.getUser(id)
        return await this.userRepository.update({ id: user.id }, { phone })
    }
}
