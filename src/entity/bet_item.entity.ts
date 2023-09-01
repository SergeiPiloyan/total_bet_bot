import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BetCardEntity } from "./bet_card.entity";

@Entity()
export class BetItem {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public matchId: string

    @ManyToOne(() => BetCardEntity, (bet_card) => bet_card.id,)
    public bet_card_id: string
}