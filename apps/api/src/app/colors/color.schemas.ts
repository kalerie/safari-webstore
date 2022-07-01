import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Transform } from "class-transformer";
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export type ColorDocument = ColorModel & Document;

@Schema({collection: 'colors'})
export class ColorModel {
    @Transform(({ value }) => value.toString())
    _id: mongoose.ObjectId;

    @Prop()
    title: string;

    @Prop()
    value: string;

}

export const ColorSchema = SchemaFactory.createForClass(ColorModel);
