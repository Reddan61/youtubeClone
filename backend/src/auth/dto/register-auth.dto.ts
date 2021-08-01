import { Equals, IsEmail, IsNotEmpty, Max, MaxLength, Min, MinLength } from "class-validator"
import { Match } from "src/decorators/match.decorator"

export class RegisterAuthDto {
    @IsNotEmpty({
        message:"Имя является обязательным полем"
    })
    @MinLength(3,{
        message:"Имя должно содержать минимум 3 символа"
    })
    @MaxLength(50,{
        message:"Имя не должно содержать больше 50 символов"
    })
    readonly name:string

    @IsNotEmpty({
        message:"Фамилия является обязательным полем"
    })
    @MinLength(3,{
        message:"Фамилия должна содержать минимум 3 символа"
    })
    @MaxLength(50,{
        message:"Фамилия не должна содержать больше 50 символов"
    })
    readonly secondName:string

    @IsEmail({
    },{
        message:"Неправильный формат почты"
    })
    readonly email:string

    @IsNotEmpty({
        message:"Пароль является обязательным полем"
    })
    @MinLength(5,{
        message:"Пароль должен содержать минимум 5 символов"
    })
    @MaxLength(50,{
        message:"Пароль не должен содержать больше 50 символов"
    })
    readonly password:string
    
    @Match("password",{
        message:"Пароли должны совпадать"
    })
    readonly passwordSub:string
}