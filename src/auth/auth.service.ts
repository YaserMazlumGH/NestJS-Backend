import { AuthDto } from './dto/auth.dto';
import { PrismaService } from './../prisma/prisma.service';
import { ForbiddenException, Injectable } from "@nestjs/common";
import * as argon from 'argon2'

@Injectable({})
export class AuthService {

    constructor(private readonly prisma: PrismaService) { }

    async login(dto: AuthDto) {

        const user = await this.prisma.user.findFirst();
        
        const decodePassword = await argon.verify(user.passwordHash, dto.password)
        console.log(decodePassword)


        if(!decodePassword) throw new ForbiddenException("Böyle bir kullanıcı yok")

        delete user.passwordHash;

        return user;
    }

    async signUp(dto: AuthDto) {
        const passwordHash = await argon.hash(dto.password)
        const user = await this.prisma.user.create({
            data: {
                email: dto.email,
                passwordHash,
            },
        });
        return user;
    }
}