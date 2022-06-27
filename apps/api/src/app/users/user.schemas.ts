import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Transform, Type } from "class-transformer";
import * as mongoose from "mongoose";
import { Document } from "mongoose";
import { ProductModel } from '../products/product.schemas';

export type UserDocument = UserModel & Document;

@Schema({collection: 'users'})
export class UserModel {
  @Transform(({ value }) => value.toString())
  _id: mongoose.ObjectId;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  gender: string;

  @Prop()
  dateOfBirth: string;

  @Prop()
  newsletters: boolean;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: ProductModel.name }],
  })
  @Type(() => ProductModel)
  favorites: ProductModel[];

}

export const UserSchema = SchemaFactory.createForClass(UserModel);
