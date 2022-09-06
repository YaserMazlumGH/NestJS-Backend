import { BookmarkService } from './bookmark.service';
import { Module } from '@nestjs/common';
import { BookmarkController } from './bookmark.controller';

@Module({
  controllers: [BookmarkController],
  providers:[BookmarkService]
})
export class BookmarkModule {}
