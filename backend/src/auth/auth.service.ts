import { RegisterAuthDto } from './dto/register-auth.dto';
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from "src/user/user.service";

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) {}

    async validateUser(email:string,password:string) {
        const user = await this.userService.findByEmail(email)

        if(!user[0]) {
            throw new HttpException("Пользователя не существует",HttpStatus.FORBIDDEN)
        }

        const isCurrect = await bcrypt.compare(password, user[0].passwordHash)
        if(user && isCurrect) {
            const {passwordHash, ...result} = user[0].toObject()
            return result
        }
        return null
    }

    async login(req,res) {
        const user = req.user
        const payload = { email: user.email, userId: user._id }

        const access_token = this.jwtService.sign(payload)
        
        res.cookie('token', access_token, {httpOnly:true})

        return {
          message: "success"
        }
    }

    async register(body:RegisterAuthDto) {
        const user = await this.userService.findByEmail(body.email)

        if(user && user[0]?.isActivated) {
            throw new HttpException("Пользователь с такой почтой существует",HttpStatus.CONFLICT)
        }

        const newUser = {
            ...body,
            passwordHash:null
        }
        delete newUser.password
        delete newUser.passwordSub

        const salt = await bcrypt.genSalt()

        newUser.passwordHash = await bcrypt.hash(body.password, salt)

        const result = await this.userService.createUser(newUser)

        return {
            message:"success",
            payload: {
                id: result.id,
                name: result.name,
                secondName:result.secondName,
                email:result.email
            }
        }
    }
}