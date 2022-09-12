import { HttpCode, HttpStatus } from '@nestjs/common';
import { BookmarkEditDto } from './model/bookmark-edit.dto';
import { BookmarkCreateDto } from './model/bookmark-create.dto';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { BookmarkService } from './bookmark.service';

@UseGuards(JwtGuard)
@Controller('bookmarks')
export class BookmarkController {

    constructor(private readonly bookmarkService: BookmarkService) { }

    @Get('getlist')
    getBookmarks(@GetUser('id') userId: number) {
        return this.bookmarkService.getBookmarkList(userId);
    }

    @Get(':id')
    getBookmarkById(@GetUser('id') userId: number, @Param('id', ParseIntPipe) bookmarkId: number) {
        return this.bookmarkService.getBookmarkById(userId, bookmarkId)
    }

    @Post()
    createBookmark(@GetUser('id') userId: number, @Body() dto: BookmarkCreateDto) {
        return this.bookmarkService.createBookmark(userId, dto)
    }

    @Patch(':id')
    editBookmarkById(@GetUser('id') userId: number, @Body() dto: BookmarkEditDto, @Param('id', ParseIntPipe) bookmarkId: number) {
        return this.bookmarkService.editBookmarkById(userId, bookmarkId, dto)
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    deleteBookmarkById(@GetUser('id') userId: number, @Param('id', ParseIntPipe) bookmarkId: number) {
        return this.bookmarkService.deleteBookmarkById(userId, bookmarkId)
    }
}
