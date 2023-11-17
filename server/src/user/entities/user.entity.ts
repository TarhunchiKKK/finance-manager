/* eslint-disable prettier/prettier */
import { Category } from 'src/category/entities/category.entity'
import { Transaction } from 'src/transaction/entities/transaction.entity'
import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    email: string

    @Column()
    password: string

    @CreateDateColumn()
    createdAt: Date

    @OneToMany(() => Category, (category: Category) => category.user, {
        onDelete: 'CASCADE',
    })
    categories: Category[]

    @OneToMany(() => Transaction, (transaction: Transaction) => transaction.user, {
        onDelete: 'CASCADE',
    })
    transactions: Transaction[]
}
