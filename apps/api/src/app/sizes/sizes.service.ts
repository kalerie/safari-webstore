import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { CreateSizeDto, UpdateSizeDto } from "@safari-store/api-interfaces";
import { Model } from "mongoose";
import { SizeDocument, SizeModel } from './size.schemas';

@Injectable()
export class SizesService {

    constructor(@InjectModel(SizeModel.name) private sizeModel: Model<SizeDocument>) {    }

    async getAll(): Promise<SizeModel[]> {
        return this.sizeModel.find().exec();
    }

    async getById(id: string): Promise<SizeModel> {
        return this.sizeModel.findById(id);
    }

    async create(sizeDto: CreateSizeDto): Promise<SizeModel> {
        const newSize = new this.sizeModel(sizeDto);
        return newSize.save();
    }

    async remove(id: string): Promise<SizeModel> {
        return this.sizeModel.findByIdAndRemove(id);
    }

    async update(id: string, sizeDto: UpdateSizeDto): Promise<SizeModel> {
        return this.sizeModel.findByIdAndUpdate(id, sizeDto, {new: true});
    }


}
