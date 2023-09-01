import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { BetCardEntity } from "./bet_card.entity";



@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ unique: true })
    public uid: string

    @Column({ type: 'text' })
    public name: string;

    @Column({ type: 'varchar', nullable: true })
    public phone: string | null;

    @OneToOne(() => BetCardEntity, (bet_card) => bet_card.id)
    @JoinColumn()
    public bet_card: BetCardEntity
}





