import { AuthDto } from './dto';
import { AuthService } from './auth.service';
import { BadRequestException, Body, Controller, Get, Post, Req } from "@nestjs/common";
import { Request } from 'express';

@Controller('auth')
export class AuthController{
    constructor(private readonly authService:AuthService){}
    
    @Post('signin')
    login(@Body() dto:AuthDto){
        this.authService.login(dto);
    }

    @Post('signup')
    signup(@Body() dto:AuthDto){
        this.authService.signUp(dto);
    }

    @Get('getlist')
    getlist(){
        return 'liste getirildi'
    }

}