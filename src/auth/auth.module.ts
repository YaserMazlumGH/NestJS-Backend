import { JwtStrategy } from './strategy/jwt.strategy';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

@Module({
    controllers:[AuthController],
    providers:[AuthService, JwtStrategy],
    imports:[JwtModule.register({})]
})
export class AuthModule {}
