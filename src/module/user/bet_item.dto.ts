import { BetCardEntity } from "src/entity/bet_card.entity";

export class CreateBetItemDTO {
    readonly matchId: string;
    readonly bet_card_id: string;
}
