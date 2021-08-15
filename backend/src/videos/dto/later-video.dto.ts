import { IsEnum, IsInt, IsMongoId, IsNotEmpty } from "class-validator"


export class LaterVideoDto {
    @IsMongoId()
    readonly videoId:string
}