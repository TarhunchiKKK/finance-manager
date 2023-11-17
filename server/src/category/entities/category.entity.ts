/* eslint-disable prettier/prettier */
import { Transaction } from 'src/transaction/entities/transaction.entity'
import { User } from 'src/user/entities/user.entity'
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm'

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @ManyToOne(() => User, (user: User) => user.categories)
    @JoinColumn({ name: 'user_id' })
    user: User

    @OneToMany(() => Transaction, (transaction: Transaction) => transaction.category)
    transactions: Transaction[]
}
