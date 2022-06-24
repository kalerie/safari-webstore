import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Transform } from "class-transformer";
import { Document } from "mongoose";
import * as mongoose from 'mongoose';

export type SizeDocument = Size & Document;

@Schema()
export class Size {
    @Transform(({ value }) => value.toString())
    _id: mongoose.ObjectId;

    @Prop()
    title: string;

    @Prop()
    value: string;
    
}

export const SizeSchema = SchemaFactory.createForClass(Size);