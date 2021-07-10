import {Column, PrimaryGeneratedColumn, Entity, ManyToMany, OneToMany, JoinTable} from "typeorm";
import { Question } from "./Question";

@Entity()
export class Category {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
    
    @OneToMany(() => Question, (question) => question.category)
    question: Question[];
}