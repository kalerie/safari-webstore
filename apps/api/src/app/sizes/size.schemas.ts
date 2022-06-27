import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Transform } from "class-transformer";
import * as mongoose from "mongoose";
import { Document } from "mongoose";

export type SizeDocument = SizeModel & Document;

@Schema({collection: 'sizes'})
export class SizeModel {
    @Transform(({ value }) => value.toString())
    _id: mongoose.ObjectId;

    @Prop()
    title: string;

    @Prop()
    value: string;

}

export const SizeSchema = SchemaFactory.createForClass(SizeModel);
