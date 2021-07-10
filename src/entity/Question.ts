import {Column, Entity, JoinTable, OneToMany, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Category} from "./Category";
import { IsDefined } from 'class-validator';

@Entity()
export class Question {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsDefined()
    question: string;

    @Column('simple-array', { nullable: true })
    @IsDefined()
    options: string[];

    @Column()
    @IsDefined()
    correctOptionIndex: number;

    @Column()
    @IsDefined()
    categoryId: number;

    @ManyToOne(() => Category, (category) => category.question)
    category: Category;

}