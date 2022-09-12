import { ForbiddenException } from '@nestjs/common';
import { BookmarkCreateDto } from './model/bookmark-create.dto';
import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { BookmarkEditDto } from './model/bookmark-edit.dto';

@Injectable()
export class BookmarkService {
    
    constructor(private readonly prisma:PrismaService){}

    async getBookmarkList(userId:number){
        const list = await this.prisma.bookmark.findMany({
            where:{
                userId
            }
        });
        return list;
    }

    async getBookmarkById(userId:number, bookmarkId:number){
        var bookmark = await this.prisma.bookmark.findFirst({
            where:{
                id:bookmarkId,
                userId
            }
        });

        return bookmark;
    }

    async createBookmark(userId:number,dto:BookmarkCreateDto){
        const bookmarkAdd = await this.prisma.bookmark.create({
            data:{
                userId,
                ...dto
            }
        });
        return bookmarkAdd;
    }

    async editBookmarkById(userId:number, bookmarkId:number, dto:BookmarkEditDto){
        const bookmark = await this.prisma.bookmark.findUnique({
            where:{
                id:bookmarkId
            }
        });

        if(!bookmark || bookmark.userId !== userId){
            throw new ForbiddenException('Access to resources denied');
        }

        return await this.prisma.bookmark.update({
            where:{
                id:bookmarkId,
            },
            data: {
                ...dto,
            }
        });
    } 

    async deleteBookmarkById(userId:number, bookmarkId:number){
        const bookmark = await this.prisma.bookmark.findUnique({
            where:{
                id: bookmarkId
            }
        })

        if(!bookmark || bookmark.userId !== userId){
            throw new ForbiddenException('Access to resources denied');
        }

        return await this.prisma.bookmark.delete({where:{id:bookmarkId}});
    }
}
