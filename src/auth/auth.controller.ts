import { AuthService } from './auth.service';
import { Body, Controller, Get, Post, Req } from "@nestjs/common";
import { LoginDto, RegisterDto } from './dto';

@Controller('auth')
export class AuthController{
    constructor(private readonly authService:AuthService){}
    
    @Post('signin')
    login(@Body() dto:LoginDto){
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