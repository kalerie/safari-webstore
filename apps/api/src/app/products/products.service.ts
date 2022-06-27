import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, QueryOptions } from "mongoose";
import { CreateProductDto, UpdateProductDto } from "@safari-store/api-interfaces";
import { ProductDocument, ProductModel } from './product.schemas';

@Injectable()
export class ProductsService {

    constructor(@InjectModel(ProductModel.name) private productModel: Model<ProductDocument>) {    }

    async getAll(): Promise<ProductModel[]> {
        return this.productModel.find().populate(['colors', 'sizes']).exec();
    }

    async getById(id: string): Promise<ProductModel> {
        const product = await this.productModel.findById(id).populate(['colors', 'sizes']);
        if(!product.colors) {
            product.colors = [];
        }
        if(!product.sizes) {
            product.sizes = [];
        }
        return product;
    }

    async create(productDto: CreateProductDto): Promise<ProductModel> {
        const newProduct = new this.productModel(productDto);
        return newProduct.save();
    }

    async remove(id: string): Promise<ProductModel> {
        return this.productModel.findByIdAndRemove(id);
    }

    async update(id: string, productDto: UpdateProductDto): Promise<ProductModel> {
        return this.productModel.findByIdAndUpdate(id, productDto, {new: true});
    }

  async find(options: QueryOptions, sort?: {[key: string]: 'asc' | 'desc'}) {
    return this.productModel.find(options).populate(['colors', 'sizes']).sort(sort).exec();
  }

}
