import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { BookmarkEditDto } from './model/bookmark-edit.dto';

@Injectable()
export class BookmarkService {
    
    constructor(private readonly prisma:PrismaService){}

    async getBookmarkList(userId:number){
        const list = await this.prisma.bookmark.findMany({
            where:{
                
            }
        });
        return list;
    }

    async getBookmarkById(bookmarkId:number){
        var bookmark = await this.prisma.bookmark.findMany({
            where:{
                id:bookmarkId
            }
        });

        return bookmark;
    }

    async createBookmark(){}

    async editBookmarkById(bookmarkId:number, dto:BookmarkEditDto){
        var bookmark = await this.prisma.bookmark.update({
            where:{
                id:bookmarkId
            },
            data:{
                ...dto
            }
        });

        return bookmark;
    }

    async deleteBookmarkById(bookmarkId:number){

    }
}
