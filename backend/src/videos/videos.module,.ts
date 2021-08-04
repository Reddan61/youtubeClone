import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { VideosController } from "./videos.controller";
import { VideosService } from "./videos.service";
import { Video, VideoSchema } from './schemas/video.schema';
import { UserModule } from "src/user/user.module";

@Module({
    providers: [VideosService],
    controllers:[VideosController],
    imports:[
        MongooseModule.forFeature([{name: Video.name, schema: VideoSchema}]),
        UserModule
    ]
})
export class VideosModule {

}