import { PrismaService } from './../../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(config:ConfigService, private readonly prisma:PrismaService){
        const secret = config.get("JWT_SECRET_KEY")
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: secret
        });
    }

    async validate(payload: {sub:number, email:string}){
        const user = await this.prisma.user.findUnique({where:{id:payload.sub}})
        delete user.passwordHash
        return user
    }
}