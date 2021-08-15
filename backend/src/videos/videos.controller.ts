import { Body, Controller, Post, Headers, UploadedFile, UseGuards, UseInterceptors, Req, Patch, Get, Param, Res, Query } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { AddCommentDto } from "src/comment/dto/add-comment.dto";
import { RatingCommentDto } from "src/comment/dto/rating-comment.dto";
import { multerSettings } from "src/core/multer";
import { LaterVideoDto } from "./dto/later-video.dto";
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

    //Предзагрузка видео
    @UseGuards(JwtAuthGuard)
    @Post("/upload")
    @UseInterceptors(FileInterceptor("video",multerSettings(false)))
    async upload(@UploadedFile() file: Express.Multer.File, @Req() req) {
        return this.videosService.uploadVideo(file,req.user)
    }

    //Публикация видео
    @UseGuards(JwtAuthGuard)
    @Patch("/upload")
    @UseInterceptors(FileInterceptor("preview",multerSettings(true)))
    async publicateVideo(@UploadedFile() file: Express.Multer.File, @Body() body:RegisterVideoDto) {
        return this.videosService.public(file,body)
    }

    //стрим видео
    @Get("/stream/:id")
    async video(@Param("id") param, @Headers() headers, @Res() res) {
        return this.videosService.stream(param,headers,res)
    }

    //Изменение рейтинга для видео
    @UseGuards(JwtAuthGuard)
    @Patch("/rating")
    async rating(@Req() req, @Body() body:RatingVideoDto) {
        return this.videosService.ratingVideo(req.user,body)
    }

    //Добавление коммента к видео
    @UseGuards(JwtAuthGuard)
    @Post("/comment")
    async addComment(@Body() body:AddCommentDto, @Req() req) {
        return this.videosService.addComment(body,req.user)
    }
    
    //Изменение рейтинга коммента
    @UseGuards(JwtAuthGuard)
    @Patch("/comment")
    async ratingComment(@Body() body:RatingCommentDto,@Req() req) {
        return this.videosService.ratingComment(req.user,body)
    }

    //Получение комментов к видео
    @Get("/comment")
    async getComment(@Query() query, @Req() req) {
        const {videoId, page} = query
        
        return this.videosService.getComments(videoId,page,req)
    }

    //Получение спика видео из подписок
    @UseGuards(JwtAuthGuard)
    @Get("/subscribe")
    async getSubscribeVideos(@Req() req, @Query() query) {
        return this.videosService.getSubscribeVideos(req.user,query)
    }

    //Добавление / удаление видео "Смотреть позже"
    @UseGuards(JwtAuthGuard)
    @Post("/later")
    async laterVideos(@Req() req, @Body() body:LaterVideoDto) {
        return this.videosService.laterVideos(req.user, String(body.videoId))
    }

    //Получение видео "Смотреть позже"
    @UseGuards(JwtAuthGuard)
    @Get("/later")
    async getLaterVideos(@Req() req, @Query() query) {
        return this.videosService.getLaterVideos(req.user,query)
    }

    //Получение лайкнутых видео
    @UseGuards(JwtAuthGuard)
    @Get("/liked")
    async getLikedVideos(@Req() req, @Query() query) {
        return this.videosService.getLikedVideos(req.user,query)
    }
}