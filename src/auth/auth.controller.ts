import { AuthDto } from './dto';
import { AuthService } from './auth.service';
import { Body, Controller, Post, Req } from "@nestjs/common";
import { Request } from 'express';

@Controller('auth')
export class AuthController{
    constructor(private readonly authService:AuthService){}
    
    @Post('signin')
    login(){
        return {msg:'signin calıstı'}
    }

    @Post('signup')
    signup(@Body() dto:AuthDto){
        this.authService.login(dto);
    }

}