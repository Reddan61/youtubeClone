import { RegisterAuthDto } from './dto/register-auth.dto';
import { Body, HttpCode, HttpStatus, Controller, Post, UseGuards, Req, Res, Response } from "@nestjs/common";
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
}