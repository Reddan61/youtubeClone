import { Controller, Get, UseGuards, Request, Patch, UseInterceptors, UploadedFile} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { multerSettings } from 'src/core/multer';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService:UserService
    ){}
    
    @UseGuards(JwtAuthGuard)
    @Get('profile')
    async getProfile(@Request() req) {
      return this.userService.getUserProfile(req.user)
    }

    @UseGuards(JwtAuthGuard)
    @Patch("/avatar")
    @UseInterceptors(FileInterceptor("file",multerSettings(true)))
    async avatar(@UploadedFile() file: Express.Multer.File, @Request() req) {
      return this.userService.avatar(file,req.user)
    }
}
