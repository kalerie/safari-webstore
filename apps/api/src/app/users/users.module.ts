import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserModel, UserSchema } from './user.schemas';

@Module({
  providers: [
    UsersService
  ],
  controllers: [
    UsersController
  ],
  imports: [
    MongooseModule.forFeature([
      {name: UserModel.name, schema: UserSchema}
    ])
  ],
  exports: [
    UsersService
  ]
})

export class UsersModule {

}
