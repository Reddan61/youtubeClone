import { IsEnum, IsInt, IsMongoId, IsNotEmpty } from "class-validator"


export class SubscribeUserDto {

    @IsNotEmpty()
    @IsMongoId()
    readonly userId:string

}