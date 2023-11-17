import { Category } from 'src/category/entities/category.entity'
import { User } from 'src/user/entities/user.entity'
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm'

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column({ nullable: true })
    type: string

    @Column()
    amount: number

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @ManyToOne(() => User, (user: User) => user.transactions)
    @JoinColumn({ name: 'user_id' })
    user: User

    @ManyToOne(() => Category, (category: Category) => category.transactions)
    @JoinColumn({ name: 'category_id' })
    category: Category
}
