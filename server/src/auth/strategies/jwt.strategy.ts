import { IsEmail } from 'class-validator';
import { ExtractJwt } from 'passport-jwt';
import { Strategy } from 'passport-jwt'
import { Injectable } from "@nestjs/common"
import { PassportStrategy } from '@nestjs/passport'
import { ConfigService } from '@nestjs/config';
import { IUser } from 'src/types/types';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('JWT_SECRET')
        })
    }

    async validate(user: IUser) {
        return { id: user.id, email: user.email }
    }
}