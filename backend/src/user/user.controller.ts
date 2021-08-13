import { Controller, Get, UseGuards, Request, Patch, UseInterceptors, UploadedFile, Post, Req, Body, Param} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { multerSettings } from 'src/core/multer';
import { SubscribeUserDto } from './dto/subscribe-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService:UserService
    ){}
    
    @Get('profile/:id')
    async getProfile(@Param("id") userId) {
      return this.userService.getUserProfile(userId)
    }

    @UseGuards(JwtAuthGuard)
    @Patch("/avatar")
    @UseInterceptors(FileInterceptor("file",multerSettings(true)))
    async avatar(@UploadedFile() file: Express.Multer.File, @Request() req) {
      return this.userService.avatar(file,req.user)
    }

    @UseGuards(JwtAuthGuard)
    @Post("/subscribe")
    async subscribe(@Req() req, @Body() body:SubscribeUserDto) {
      return this.userService.subscribe(body.userId,req.user)
    }
}
