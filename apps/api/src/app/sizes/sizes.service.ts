import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { CreateSizeDto, Size, SizeDocument, UpdateSizeDto } from "@safari-store/api-interfaces";
import { Model } from "mongoose";

@Injectable()
export class SizesService {

    constructor(@InjectModel(Size.name) private sizeModel: Model<SizeDocument>) {    }

    async getAll(): Promise<Size[]> {
        return this.sizeModel.find().exec();
    }

    async getById(id: string): Promise<Size> {
        return this.sizeModel.findById(id);
    }

    async create(sizeDto: CreateSizeDto): Promise<Size> {
        const newSize = new this.sizeModel(sizeDto);
        return newSize.save();
    }

    async remove(id: string): Promise<Size> {
        return this.sizeModel.findByIdAndRemove(id);
    }

    async update(id: string, sizeDto: UpdateSizeDto): Promise<Size> {
        return this.sizeModel.findByIdAndUpdate(id, sizeDto, {new: true});
    }
    
}