import { UserController } from './user.controller';
import { Module } from '@nestjs/common';

@Module({
    controllers:[UserController],
    providers:[],
    imports:[]
})
export class UserModule {
    
}
