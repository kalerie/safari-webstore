import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Transform, Type } from "class-transformer";
import * as mongoose from 'mongoose';
import { Document } from "mongoose";
import { Product } from "./product.schemas";

export type ColorDocument = Color & Document;

@Schema()
export class Color {
    @Transform(({ value }) => value.toString())
    _id: mongoose.ObjectId;

    @Prop()
    title: string;

    @Prop()
    value: string;
    
    // @Prop({
    //     type: [{ type: mongoose.Schema.Types.ObjectId, ref: Product.name }],
    //   })
    // @Type(() => Product)
    // products: Product;

}

export const ColorSchema = SchemaFactory.createForClass(Color);