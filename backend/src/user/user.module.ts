import { MongooseModule } from '@nestjs/mongoose';
import { Module } from "@nestjs/common";
import { User, UserSchema } from './schemas/user.schema';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    providers: [UserService],
    controllers: [UserController],
    exports:[UserService],
    imports:[
        MongooseModule.forFeature([{name: User.name, schema: UserSchema}])
    ]
})
export class UserModule {}