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
        console.log(newUser.bet_card);

        const betCard = this.betCardRepository.create({
            userId: newUser.uid,
        });

        this.betCardRepository.save(betCard);
        newUser.bet_card = betCard;

        this.userRepository.save(newUser)
        return newUser
    }






    async addMatchId(id: string, payload: { mId: number, cf: number, t: 'P1' | 'X' | 'P2' }) {
        const user = await this.getUser(id)
        // console.log(user, id);
        return this.createBetItem({ bet_card_id: String(user.bet_card), matchId: String(payload.mId) })
    }



    async createBetItem(dto: CreateBetItemDTO): Promise<BetItem> {
        try {
            const item = await this.betItemRepository.create(dto);
            // console.log('item', item);
            const f = await this.betItemRepository.save(item);
            return f
        } catch (error) {
            console.log('ошибка');
        }
    }






    async getUser(uid: string) {
        return await this.userRepository.findOne({ where: { uid } });
    }

    async updatePhoneNumber({ id, phone }: { id: string, phone: string }) {
        const user = await this.getUser(id)
        return await this.userRepository.update({ id: user.id }, { phone })
    }
}



    // async addBetItem(dto: CreateBetItemDTO) {
    //     const item = this.betItemRepository.create(dto);
    //     await this.betItemRepository.save(item);
    // }