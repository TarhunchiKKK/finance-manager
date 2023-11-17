import { BadRequestException, Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './entities/user.entity'
import * as argon2 from 'argon2'

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async create(createUserDto: CreateUserDto) {
        const existUser = await this.userRepository.findOne({
            where: {
                email: createUserDto.email,
            },
        })

        if (existUser) throw new BadRequestException('This email already exist')

        const user: User = await this.userRepository.save({
            email: createUserDto.email,
            password: await argon2.hash(createUserDto.password),
        })

        return { user }
    }

    findAll() {
        return `This action returns all user`
    }

    findOne(id: number) {
        return `This action returns a #${id} user`
    }
}
