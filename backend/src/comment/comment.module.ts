import { MongooseModule } from '@nestjs/mongoose';
import { Module } from "@nestjs/common";
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { UserModule } from './../user/user.module';
import { CommentSchema, Comment } from './schemas/comment.schema';

@Module({
    controllers: [
        CommentController
    ],
    providers: [
        CommentService
    ],
    imports:[
        MongooseModule.forFeature([{name: Comment.name, schema: CommentSchema}]),
        UserModule
    ],
    exports: [
        CommentService
    ]
})
export class CommentModule {}