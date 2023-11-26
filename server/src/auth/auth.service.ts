import { JwtService } from '@nestjs/jwt';
/* eslint-disable prettier/prettier */
import { UserService } from 'src/user/user.service'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { User } from 'src/user/entities/user.entity'
import * as argon2 from 'argon2'
import { IUser } from 'src/types/types';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

    async validateUser(email: string, password: string): Promise<any> {
        const user: User = await this.userService.findOne(email)
        if (user) {
            const passwordsMatch: boolean = await argon2.verify(user.password, password)
            if (passwordsMatch) {
                return user
            }
        }
        throw new UnauthorizedException('User or password are incorrect')
    }

    async login(user: IUser) {
        const { id, email } = user
        return {
            id, email, token: this.jwtService.sign({ id: user.id, email: user.email })
        }
    }
}
