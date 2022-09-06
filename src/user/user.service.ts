import { UserModel } from './../models/user.model';
import { EditUserDto } from './dto/edit-user.dto';
import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {

    constructor(private readonly prisma:PrismaService){}

    async editUser(id:number, dto:EditUserDto){
        const user = await this.prisma.user.update({
            where:{
                id
            },
            data:{
                ...dto
            }
        });

        delete user.passwordHash;

        return user;
    }
}
