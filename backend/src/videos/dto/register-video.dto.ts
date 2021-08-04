import { Equals, IsEmail, IsMongoId, IsNotEmpty, Max, MaxLength, Min, MinLength } from "class-validator"
import { Match } from "src/decorators/match.decorator"

export class RegisterVideoDto {
    @IsNotEmpty({
        message:"Название является обязательным полем"
    })
    @MinLength(5,{
        message:"Название должно содержать минимум 5 символов"
    })
    @MaxLength(100,{
        message:"Название не должно содержать больше 100 символов"
    })
    readonly name:string

    @MaxLength(5000,{
        message:"Описание не должно превышать 5000 символов"
    })
    readonly description:string

    @IsNotEmpty({
        message:"Видео ID является обязательным полем"
    })
    @IsMongoId()
    readonly videoId:string
    
    // @IsNotEmpty({
    //     message:"Превью обязательно"
    // })
    // readonly previewImage:Express.Multer.File
}