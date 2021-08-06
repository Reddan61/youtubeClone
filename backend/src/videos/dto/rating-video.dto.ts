import { IsEnum, IsInt, IsMongoId, IsNotEmpty } from "class-validator"


export class RatingVideoDto {
    @IsMongoId()
    readonly videoId:string

    @IsNotEmpty()
    @IsInt()
    @IsEnum({1:1,2:2})
    readonly rating:  1 | 2
}