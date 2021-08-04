import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { VideosModule } from './videos/videos.module,';

@Module({
  imports: [
    //env
    ConfigModule.forRoot({
      cache: true,
      isGlobal:true
    }),
    //mongoDB connect
    MongooseModule.forRoot(process.env.DATABASE_URL, {
      useFindAndModify:false
    } ),
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '..', 'uploads'),
    // }),
    AuthModule,
    VideosModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
