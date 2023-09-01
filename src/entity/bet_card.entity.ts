import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";
import { BetItem } from "./bet_item.entity";

enum BetTypes {
    Single = 1,
    Express = 2,
    Complex = 3
}

@Entity()
export class BetCardEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @OneToOne(() => UserEntity, (user) => user.id)
    public userId: string;

    @ManyToMany(() => BetItem, (card) => card.id, { nullable: true })
    @JoinColumn()
    public cardItems: BetItem[]

    @Column("enum", { enum: BetTypes, nullable: true })
    public type: BetTypes;
}