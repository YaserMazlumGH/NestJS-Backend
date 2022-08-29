import { AuthDto } from './dto/auth.dto';
import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from "@nestjs/common";

@Injectable({})
export class AuthService{

    constructor(private readonly prisma:PrismaService){}

    login(dto:AuthDto){
        console.log({dto})
        return {mesaj:"Giriş yapıldı."}
    }

    signUp(){}
}