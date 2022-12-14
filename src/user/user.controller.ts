import { UserService } from './user.service';
import { EditUserDto } from './dto/edit-user.dto';
import { JwtGuard } from './../auth/guard/jwt.guard';
import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@UseGuards(JwtGuard)
@Controller('users')
export class UserController {

    constructor(private readonly userService:UserService){}

    @Get('me')
    getMe(@GetUser() user:User){
        return user;
    }

    @Patch()
    editUser(@GetUser('id') userId:number, @Body() dto:EditUserDto){
        return this.userService.editUser(userId, dto);
    }
}
