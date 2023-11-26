import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local'
import { AuthService } from '../auth.service'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { User } from 'src/user/entities/user.entity';


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
            usernameField: 'email'
        })
    }

    async validate(email: string, password: string) {
        const user: User = await this.authService.validateUser(email, password)
        if (user) {
            return user
        }
        throw new UnauthorizedException()
    }
}