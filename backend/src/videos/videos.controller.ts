import { Body, Controller, Post, Put, UploadedFile, UseGuards, UseInterceptors, Req, Patch } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { multerSettings } from "src/core/multer";
import { RegisterVideoDto } from "./dto/register-video.dto";
import { VideosService } from "./videos.service";




@Controller("videos")
export class VideosController {
    constructor(private readonly videosService:VideosService){}

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

}