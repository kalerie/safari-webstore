import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { CreateColorDto, UpdateColorDto } from "@safari-store/api-interfaces";
import { Model } from "mongoose";
import { ColorDocument, ColorModel } from './color.schemas';

@Injectable()
export class ColorsService {

    constructor(@InjectModel(ColorModel.name) private colorModel: Model<ColorDocument>) {    }

    async getAll(): Promise<ColorModel[]> {
        return this.colorModel.find().exec();
    }

    async getById(id: string): Promise<ColorModel> {
        return this.colorModel.findById(id);
    }

    async create(colorDto: CreateColorDto): Promise<ColorModel> {
        const newColor = new this.colorModel(colorDto);
        return newColor.save();
    }

    async remove(id: string): Promise<ColorModel> {
        return this.colorModel.findByIdAndRemove(id);
    }

    async update(id: string, colorDto: UpdateColorDto): Promise<ColorModel> {
        return this.colorModel.findByIdAndUpdate(id, colorDto, {new: true});
    }

}
