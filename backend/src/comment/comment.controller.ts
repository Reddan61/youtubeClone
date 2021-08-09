import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { CommentService } from './comment.service';
import { AddCommentDto } from './dto/add-comment.dto';


@Controller("comment")
export class CommentController {
    constructor(private readonly commentService:CommentService) {}
    
    // @UseGuards(JwtAuthGuard)
    // @Post()
    // async addComment(@Body() body:AddCommentDto, @Req() req) {
    //     return this.commentService.addComment(body,req.user)
    // }

}