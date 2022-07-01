import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { Document } from "mongoose";
import { Transform, Type } from 'class-transformer';
import { ColorModel } from '../colors/color.schemas';
import { SizeModel } from '../sizes/size.schemas';

export type ProductDocument = ProductModel & Document & { updatedAt: Date };

@Schema({collection: 'products', timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }})
export class ProductModel {

  @Transform(({ value }) => value.toString())
  _id: mongoose.ObjectId;

  @Prop()
  title: string;

  @Prop()
  price: number;

  @Prop()
  imageUrl: string;

  @Prop()
  type: string;

  @Prop()
  category: string;

  @Prop({
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: ColorModel.name }],
    })
  @Type(() => ColorModel)
  colors: ColorModel[];

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: SizeModel.name }],
  })
  @Type(() => SizeModel)
  sizes: SizeModel[];

}

export const ProductSchema = SchemaFactory.createForClass(ProductModel);
