import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {Question} from "./Question";

@Entity()
export class Choice {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    user_id: number;

    @Column()
    score: number;

}