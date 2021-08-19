import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { BadRequestException, HttpException, HttpStatus, Injectable, InternalServerErrorException } from "@nestjs/common";
import { RegisterAuthDto } from './dto/register-auth.dto';
import { UserService } from "src/user/user.service";
import { sendEmail } from 'src/utils/email';
import { IValidateJWT } from './jwt.strategy';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) {}

    async validateUser(email:string,password:string) {
        const user = await this.userService.findByEmail(email)

        if(!user) {
            throw new HttpException("Пользователя не существует",HttpStatus.FORBIDDEN)
        }

        const isCurrect = await bcrypt.compare(password, user.passwordHash)
        if(user && isCurrect) {
            //const {passwordHash, ...result} = user[0].toObject()
            return {
                _id: user._id,
                name:user.name,
                secondName: user.secondName,
                email: user.email,
                avatar: user.avatar
            }
        }
        return null
    }

    async login(req,res) {
        const user = req.user
        const payload = { email: user.email, userId: user._id }

        const access_token = this.jwtService.sign(payload)
        
        res.cookie('token', access_token, {httpOnly:true})
       
        return {
          message: "success",
          payload: user
        }
    }

    async register(body:RegisterAuthDto) {
        const user = await this.userService.findByEmail(body.email)

        if(user && user[0]?.isActivated) {
            throw new HttpException("Пользователь с такой почтой существует",HttpStatus.CONFLICT)
        } else if(user && user[0]?.isActivated === false) {
            await this.userService.deleteById(user[0]._id)
        }
        const newUser = {
            ...body,
            passwordHash:null,
            verifyHash:null
        }

        delete newUser.password
        delete newUser.passwordSub

        const salt = await bcrypt.genSalt()

        newUser.passwordHash = await bcrypt.hash(body.password, salt)

        async function generateVerifyHash() {
            const code = Math.trunc(Math.random() * (9999 - 1000) + 1000)
            const codeHashed = await bcrypt.hash(String(code), salt) 

            const userCodeFound = await this.userService.getUserByHashCode(codeHashed)
       

            if(userCodeFound[0]) {
                generateVerifyHash()
            }

            return [code, codeHashed]
        }
        

        const [code,verifyHash] = await generateVerifyHash.call(this)
        newUser.verifyHash = verifyHash

        const result = await this.userService.createUser(newUser)
        
        const auth = await sendEmail({
            from: 'admin@mail.ru',
            to:result.email,
            subject:"Подтверждение почты",
            userId: result._id,
            code
        })

        if(auth.rejected[0]) {
            await this.userService.deleteById(result._id)
            throw new InternalServerErrorException()
        }

        return {
            message:"success",
            payload: {
                id: result.id,
                name: result.name,
                secondName:result.secondName,
                email:result.email,
                avatar: result.avatar
            }
        }
    }

    async logout(res) {
        res.cookie('token', "", {
            httpOnly:true,
            maxAge: 0
        })
        return {
            message:"success"
        }
    }

    async verify(body) {
        if(!body.code || !body.userId) {
            throw new BadRequestException()
        }

        const user = await this.userService.getUserById(body.userId)

        if(!user || user.isActivated) {
            throw new BadRequestException()
        }

        const isCurrect = await bcrypt.compare(String(body.code), user.verifyHash)
        
        if(!isCurrect) {
            throw new HttpException({
                status:HttpStatus.BAD_REQUEST,
                error:"Неправильный код"
            },HttpStatus.BAD_REQUEST)
        }

        const result = await this.userService.activate(user._id)

        if(result.message !== "success") {
            throw new InternalServerErrorException()
        }

        return {
            message:"success"
        }
    }

    async checkEmail(email:string) {
        if(!email) {
            throw new BadRequestException()
        }

        const user = await this.userService.findByEmail(email)

        if(!user) {
            throw new BadRequestException()
        }

        return {
            message:"success",
            payload: {
                email:user.email
            }
        }
    }


    async me(user:IValidateJWT) {
        const userFound = await this.userService.getUserById(user.userId)

        if(!userFound) {
            throw new BadRequestException()
        }

        return {
            message:"success",
            payload: {
                _id: userFound._id,
                avatar: userFound.avatar,
                name:userFound.name,
                secondName: userFound.secondName,
                email: userFound.email
            }
        }
    }
}