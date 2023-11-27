import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { CreateTransactionDto } from './dto/create-transaction.dto'
import { UpdateTransactionDto } from './dto/update-transaction.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Transaction } from './entities/transaction.entity'
import { Repository } from 'typeorm'
import { use } from 'passport'

@Injectable()
export class TransactionService {
    constructor(@InjectRepository(Transaction) private readonly transactionRepository: Repository<Transaction>) {}
    
    async create(createTransactionDto: CreateTransactionDto, userId: number): Promise<Transaction> {
        const transaction = {
            title: createTransactionDto.title,
            amount: createTransactionDto.amount,
            type: createTransactionDto.type,
            user: {
                id: userId,
            },
            category: {
                id: +createTransactionDto.category.id,
            }
        }

        if (!transaction) throw new BadRequestException('Something went wrong')

        return await this.transactionRepository.save(transaction)
    }

    async findAllWithPagination(userId: number, page: number, limit: number): Promise<Transaction[]> {
        return await this.transactionRepository.find({
            where: {
                user: {
                    id: userId,
                }
            },
            // relations: {
            //     user: true,
            //     category: true,
            // },
            order: {
                createdAt: 'DESC',
            },
            skip: (page - 1) * limit,
            take: limit
        })
    }

    async findAll(userId: number): Promise<Transaction[]> {
        return await this.transactionRepository.find({
            where: {
                user: {
                    id: userId,
                }
            },
            order: {
                createdAt: 'DESC',
            }
        })
    }

    async findOne(id: number): Promise<Transaction> {
        const transaction: Transaction = await this.transactionRepository.findOne({
            where: {
                id: id,
            },
            relations: {
                user: true,
                category: true,
            }
        })

        if (!transaction) throw new NotFoundException('Transaction not found')

        return transaction
    }

    async update(id: number, updateTransactionDto: UpdateTransactionDto) {
        const transaction: Transaction  = await this.transactionRepository.findOne({
            where: {
                id: id,
            }
        })

        if (!transaction) throw new NotFoundException("Transaction not found")

        return await this.transactionRepository.update(id, updateTransactionDto)
    }

    async remove(id: number) {
        const transaction: Transaction = await this.transactionRepository.findOne({
            where: {
                id: id,
            }
        })

        if (!transaction) throw new NotFoundException('Transaction not found')

        return this.transactionRepository.delete(id)
    }
}
