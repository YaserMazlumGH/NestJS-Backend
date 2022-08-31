import { RegisterDto } from './dto/register.dto';
import { ConstantsMessages } from './messages/constantsMessages';
import { LoginDto } from './dto/auth.dto';
import { PrismaService } from './../prisma/prisma.service';
import { ForbiddenException, Injectable } from "@nestjs/common";
import * as argon from 'argon2'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable({})
export class AuthService {

    constructor(private readonly prisma: PrismaService) { }

    async login(dto: LoginDto) {

        const user = await this.prisma.user.findUnique({
            where: {
                email:dto.email,
            }
        });
        if (!user) throw new ForbiddenException(ConstantsMessages.notUserDefinied);

        const decodePassword = await argon.verify(user.passwordHash, dto.password)
        if (!decodePassword) throw new ForbiddenException(ConstantsMessages.passwordIncorrect);

        delete user.passwordHash;

        return user;
    }

    async register(dto: RegisterDto) {
        try {
            const passwordHash = await argon.hash(dto.password)
            const user = await this.prisma.user.create({
                data: {
                    firstName: dto.firstName,
                    lastName: dto.lastName,
                    email: dto.email,
                    passwordHash,
                }
            });
            delete user.passwordHash;

            return user;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002')
                    throw new ForbiddenException(ConstantsMessages.userExists)
            }
            throw error;
        }
    }

    async getList() {
        const userList = await this.prisma.user.findMany({
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true
            }
        });

        return userList;
    }
}