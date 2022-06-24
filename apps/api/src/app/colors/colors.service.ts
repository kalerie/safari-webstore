import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Color, ColorDocument, CreateColorDto, UpdateColorDto } from "@safari-store/api-interfaces";
import { Model } from "mongoose";

@Injectable()
export class ColorsService {

    constructor(@InjectModel(Color.name) private colorModel: Model<ColorDocument>) {    }

    async getAll(): Promise<Color[]> {
        return this.colorModel.find().exec();
    }

    async getById(id: string): Promise<Color> {
        return this.colorModel.findById(id);
    }

    async create(colorDto: CreateColorDto): Promise<Color> {
        const newColor = new this.colorModel(colorDto);
        return newColor.save();
    }

    async remove(id: string): Promise<Color> {
        return this.colorModel.findByIdAndRemove(id);
    }

    async update(id: string, colorDto: UpdateColorDto): Promise<Color> {
        return this.colorModel.findByIdAndUpdate(id, colorDto, {new: true});
    }
    
}