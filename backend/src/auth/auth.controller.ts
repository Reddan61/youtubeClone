import { Body, HttpCode, HttpStatus, Controller, Post, UseGuards, Req, Res, Response, Delete, Patch, Get, Query } from "@nestjs/common";
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./guards/local-auth.guard";

@Controller("auth")
export class AuthController {
    constructor(
        // private readonly userService:UserService,
        private readonly authService:AuthService
    ){}

    @Post('/register')
    @HttpCode(HttpStatus.CREATED)
    register(@Body() body:RegisterAuthDto) {
        return this.authService.register(body)
    }

    @UseGuards(LocalAuthGuard)
    @Post("/login")
    login(@Req() request, @Res({ passthrough: true }) response: Response) {

        return this.authService.login(request,response)
    }

    @UseGuards(JwtAuthGuard)
    @Delete("/logout")
    logout(@Res({ passthrough: true }) response: Response) {
        return this.authService.logout(response)
    }

    @Patch("/verify")
    verify(@Body() body) {
        return this.authService.verify(body)
    }

    @Get("/check")
    checkEmail(@Query() query) {
        return this.authService.checkEmail(query.email)
    }

    @UseGuards(JwtAuthGuard)
    @Get("/me")
    me(@Req() req) {
        return this.authService.me(req.user)
    }
}