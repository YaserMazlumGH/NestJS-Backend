import { Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { BookmarkService } from './bookmark.service';

@UseGuards(JwtGuard)
@Controller('bookmarks')
export class BookmarkController {

    constructor(private readonly bookmarkService:BookmarkService){}

    @Get('getlist')
    getBookmarks(@GetUser('id') userId:number){
        return this.bookmarkService.getBookmarkList(userId);
    }

    @Get(':id')
    getBookmarkById(@GetUser('id') userId:number, @Param('id') bookmarkId:number){}

    @Post()
    createBookmark(@GetUser('id') userId:number){}

    @Patch()
    editBookmarkById(@GetUser('id') userId:number){}

    @Delete()
    deleteBookmarkById(@GetUser('id') userId:number){}
}
