import { IsMongoId, IsNotEmpty, IsString, MaxLength, } from "class-validator"

export class AddCommentDto {
    @IsNotEmpty()
    @IsMongoId()
    videoId:string

    // @IsNotEmpty()
    // @IsMongoId()
    // userId:string
    

    @IsNotEmpty()
    @IsString()
    @MaxLength(200, {
        message:"Максимум 200 символов"
    })
    text:string
}