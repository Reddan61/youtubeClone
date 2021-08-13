import { Body, Controller, Post, Headers, UploadedFile, UseGuards, UseInterceptors, Req, Patch, Get, Param, Res, Query } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { AddCommentDto } from "src/comment/dto/add-comment.dto";
import { RatingCommentDto } from "src/comment/dto/rating-comment.dto";
import { multerSettings } from "src/core/multer";
import { RatingVideoDto } from "./dto/rating-video.dto";
import { RegisterVideoDto } from "./dto/register-video.dto";
import { VideosService } from "./videos.service";




@Controller("videos")
export class VideosController {
    constructor(
        private readonly videosService:VideosService
    ){}
   
    @Get("/")
    async getMainVideos(@Query() query) {
        return this.videosService.getMainVideos(query)
    }

    @Get("/video")
    async getVideo(@Query() query, @Req() req) {
        return this.videosService.getVideoById(query.videoId,req)
    }

    @UseGuards(JwtAuthGuard)
    @Post("/upload")
    @UseInterceptors(FileInterceptor("video",multerSettings(false)))
    async upload(@UploadedFile() file: Express.Multer.File, @Req() req) {
        return this.videosService.uploadVideo(file,req.user)
    }

    @UseGuards(JwtAuthGuard)
    @Patch("/upload")
    @UseInterceptors(FileInterceptor("preview",multerSettings(true)))
    async publicateVideo(@UploadedFile() file: Express.Multer.File, @Body() body:RegisterVideoDto) {
        return this.videosService.public(file,body)
    }

    @Get("/stream/:id")
    async video(@Param("id") param, @Headers() headers, @Res() res) {
        return this.videosService.stream(param,headers,res)
    }

    @UseGuards(JwtAuthGuard)
    @Patch("/rating")
    async rating(@Req() req, @Body() body:RatingVideoDto) {
        return this.videosService.ratingVideo(req.user,body)
    }

    @UseGuards(JwtAuthGuard)
    @Post("/comment")
    async addComment(@Body() body:AddCommentDto, @Req() req) {
        return this.videosService.addComment(body,req.user)
    }
    
   
    @UseGuards(JwtAuthGuard)
    @Patch("/comment")
    async ratingComment(@Body() body:RatingCommentDto,@Req() req) {
        return this.videosService.ratingComment(req.user,body)
    }

    @Get("/comment")
    async getComment(@Query() query, @Req() req) {
        const {videoId, page} = query
        
        return this.videosService.getComments(videoId,page,req)
    }

    @UseGuards(JwtAuthGuard)
    @Get("/subscribe")
    async getSubscribeVideos(@Req() req, @Query() query) {
        return this.videosService.getSubscribeVideos(req.user,query)
    }
}