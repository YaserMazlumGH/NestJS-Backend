import { AuthDto } from './dto/auth.dto';
import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from "@nestjs/common";
import * as argon from 'argon2'

@Injectable({})
export class AuthService{

    constructor(private readonly prisma:PrismaService){}

    login(dto:AuthDto){
        console.log({dto})
        return {mesaj:"Giriş yapıldı."}
    }

    async signUp(dto:AuthDto){
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