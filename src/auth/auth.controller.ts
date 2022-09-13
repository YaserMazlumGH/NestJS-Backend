import { AuthService } from './auth.service';
import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req } from "@nestjs/common";
import { LoginDto, RegisterDto } from './dto';
import { Request } from 'express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController{
    constructor(private readonly authService:AuthService){}
    
    @HttpCode(HttpStatus.OK)
    @Post('signin')
    login(@Body() dto:LoginDto,@Req() req:Request){
        //console.log({ req })
        let data = this.authService.login(dto);
        return data;
    }

    @Post('signup')
    signup(@Body() dto:RegisterDto){
        let data = this.authService.register(dto);
        return data;
    }

    @Get('getlist')
    getlist(){
        let users = this.authService.getList();
        return users;
    }

}