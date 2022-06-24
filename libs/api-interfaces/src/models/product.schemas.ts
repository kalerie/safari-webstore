import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import * as mongoose from 'mongoose';
import { Color } from "./color.schemas";
import { Transform, Type } from 'class-transformer';
import { Size } from "./size.schemas";

export type ProductDocument = Product & Document;

@Schema()
export class Product {

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
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: Color.name }],
    })
  @Type(() => Color)
  colors: Color[];

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: Size.name }],
  })
  @Type(() => Size)
  sizes: Size[];

  
  // productColors?: ProductsColors[]
  // size?: Size;
  // colors?: Color;

  // for several owners
  // @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Owner' }] })
  // owner: Owner[];
  // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Owner' })
  // owner: Owner;

  // nested obj not defined as a class
  // @Prop(raw({
  //     firstName: { type: String },
  //     lastName: { type: String }
  //   }))
  //   details: Record<string, any>;
}

export const ProductSchema = SchemaFactory.createForClass(Product);