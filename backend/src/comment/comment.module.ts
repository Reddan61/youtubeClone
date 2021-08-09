import { MongooseModule } from '@nestjs/mongoose';
import { Module } from "@nestjs/common";
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { CommentSchema, Comment } from './schemas/comment.schema';

@Module({
    controllers: [
        CommentController
    ],
    providers: [
        CommentService
    ],
    imports:[
        MongooseModule.forFeature([{name: Comment.name, schema: CommentSchema}])
    ],
    exports: [
        CommentService
    ]
})
export class CommentModule {}