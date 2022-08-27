import { UserModel } from './../models/user.model';
import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('items')
export class ItemsController {

    names:UserModel[]=[
        {name:'Ahmet', lastName:'Kaya', phone:'+90555', age:49},
        {name:'Ayse', lastName:'Hanım', phone:'+90555', age:50},
        {name:'Yahya', lastName:'Kara', phone:'+90555', age:34},
        {name:'İbrahim', lastName:'Soylu', phone:'+90555', age:45},
    ]
    @Get()
    getItems(){
        return this.names;
    }

    @Post('user-add')
    userAdd(@Body() user:UserModel):string{
        this.names.push(user);
        return 'Eklendi ' + user.name;
        
    }
}
